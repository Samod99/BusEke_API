require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
//const User = require('./models/User')
const userRoutes = require('./routes/userRoutes');
const routeRoutes = require('./routes/routeRoutes');
const busRoutes = require('./routes/busRoutes');
const authRoutes = require('./routes/authRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const seatBookedBusRoutes = require('./routes/seatBookedBusRoutes');
const swaggerSetup = require('./swagger');

app.get('/', (req, res) => {
    res.send('Welcome to BusEke API')
})


app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/seatBookedBus', seatBookedBusRoutes);

// app.post('/user', async(req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.status(200).json(user);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message})
//     }
// })

swaggerSetup(app);

mongoose.connect('mongodb+srv://admin:admin01@cluster0.4zsmx.mongodb.net/BusEkeDB?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('successfully connected')
    app.listen(5000, () => {
        console.log('Port is 5000')
        console.log(`API is running on http://localhost:5000`);
        console.log(`Swagger Documentataion running on http://localhost:5000/api-docs`);
    });
}).catch((error) => {
    console.log(error)
})