const TimetableHeader = require('../models/TimetableHeader');
const TimetableDetails = require('../models/TimetableBody');

exports.createTimetable = async (req, res) => {
    const { route, creater, validFrom, validTo, createdAt, isActive, buses } = req.body; 
    const session = await TimetableHeader.startSession();
    session.startTransaction();

    try {
        const timetableHeader = new TimetableHeader({ route, creater, validFrom, validTo, createdAt, isActive });
        await timetableHeader.save({ session });

        const timetableDetails = buses.map(bus => ({
            headerId: timetableHeader._id,
            ...bus,
        }));

        await TimetableDetails.insertMany(timetableDetails, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'Timetable created successfully' });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: err.message });
    }
};

exports.getTimetables = async (req, res) => {
    try {
        const headers = await TimetableHeader.find()
            .populate({ path: 'route', model: 'Route' }) 
            .populate({ path: 'creater', model: 'User' }) 
            .lean(); 

        for (const header of headers) {
            const bodyDetails = await TimetableDetails.find({ headerId: header._id })
                .populate({ path: 'bus', model: 'Bus' }) 
                .exec();
            header.details = bodyDetails; 
        }

        res.status(200).json(headers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.editTimetable = async (req, res) => {
    const { id } = req.params; 
    const { route, creater, validFrom, validTo, isActive, buses } = req.body; 
    const session = await TimetableHeader.startSession();
    session.startTransaction();

    try {
        const timetableHeader = await TimetableHeader.findByIdAndUpdate(
            id,
            { route, creater, validFrom, validTo, isActive },
            { new: true, session } 
        );

        if (!timetableHeader) {
            throw new Error('Timetable header not found');
        }

        await TimetableDetails.deleteMany({ headerId: id }, { session });

        const timetableBodies = buses.map(bus => ({
            headerId: id,
            bus: bus.bus,
            departureLocation: bus.departureLocation,
            departureTime: bus.departureTime,
            arrivalLocation: bus.arrivalLocation,
            arrivalTime: bus.arrivalTime,
            stops: bus.stops,
        }));

        await TimetableDetails.insertMany(timetableBodies, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Timetable updated successfully' });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: err.message });
    }
};

exports.deleteTimetable = async (req, res) => {
    const { id } = req.params;
    const session = await TimetableHeader.startSession();
    session.startTransaction();

    try {
        const headerDeletion = await TimetableHeader.findByIdAndDelete(id, { session });
        if (!headerDeletion) {
            throw new Error('Timetable header not found');
        }

        await TimetableDetails.deleteMany({ headerId: id }, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Timetable deleted successfully' });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: err.message });
    }
};




// exports.getTimetables = async (req, res) => {
//     try {
//         const filter = {};
//         if (req.query.route && req.query.route.trim()) filter.route = req.query.route.trim();
//         if (req.query.creater && req.query.creater.trim()) filter.creater = req.query.creater.trim();
//         if (req.query.validFrom) filter.validFrom = { $gte: new Date(req.query.validFrom) };
//         if (req.query.validTo) filter.validTo = { $lte: new Date(req.query.validTo) };
//         if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';

//         const timetables = await TimetableHeader.find(filter)
//             .populate('route creater')
//             .populate({
//                 path: '_id',
//                 model: 'TimetableBody',
//                 populate: { path: 'bus', model: 'Bus' },
//             });

//         res.status(200).json(timetables);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getTimetables = async (req, res) => {
//     try {
//         const filter = {};

//         if (req.query.route && req.query.route.trim()) filter.route = req.query.route.trim();
//         if (req.query.creater && req.query.creater.trim()) filter.creater = req.query.creater.trim();
//         if (req.query.validFrom) filter.validFrom = { $gte: new Date(req.query.validFrom) };
//         if (req.query.validTo) filter.validTo = { $lte: new Date(req.query.validTo) };
//         if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';

//         const bodyFilter = {};
//         if (req.query.departureLocation && req.query.departureLocation.trim())
//             bodyFilter.departureLocation = req.query.departureLocation.trim();
//         if (req.query.arrivalLocation && req.query.arrivalLocation.trim())
//             bodyFilter.arrivalLocation = req.query.arrivalLocation.trim();

//         const timetables = await TimetableHeader.aggregate([
//             { $match: filter }, 
//             {
//                 $lookup: {
//                     from: 'timetablebodies', 
//                     localField: '_id',
//                     foreignField: 'headerId',
//                     as: 'details',
//                 },
//             },
//             { $unwind: '$details' }, 
//             { $match: bodyFilter }, 
//             {
//                 $group: {
//                     _id: '$_id',
//                     route: { $first: '$route' },
//                     creater: { $first: '$creater' },
//                     validFrom: { $first: '$validFrom' },
//                     validTo: { $first: '$validTo' },
//                     isActive: { $first: '$isActive' },
//                     createdAt: { $first: '$createdAt' },
//                     details: { $push: '$details' },
//                 },
//             },
//         ]);

//         res.status(200).json(timetables);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };