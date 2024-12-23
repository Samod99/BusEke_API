const express = require('express');
const timetableController = require('../controllers/timetableController');
const { authenticate, authorization } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Timetables
 *   description: Timetable management endpoints
 */

/**
 * @swagger
 * /timetables:
 *   post:
 *     summary: Create a new timetable 
 *     tags: [Timetables]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - route
 *               - creater
 *               - validFrom
 *               - validTo
 *               - buses
 *             properties:
 *               route:
 *                 type: string
 *                 description: The ID of the route
 *               creater:
 *                 type: string
 *                 description: The ID of the user creating the timetable
 *               validFrom:
 *                 type: string
 *                 format: date
 *               validTo:
 *                 type: string
 *                 format: date
 *               isActive:
 *                 type: boolean
 *               buses:
 *                 type: array
 *                 description: List of buses for this timetable
 *                 items:
 *                   type: object
 *                   properties:
 *                     bus:
 *                       type: string
 *                       description: The ID of the bus
 *                     departureLocation:
 *                       type: string
 *                     departureTime:
 *                       type: string
 *                       format: date-time
 *                     arrivalLocation:
 *                       type: string
 *                     arrivalTime:
 *                       type: string
 *                       format: date-time
 *                     stops:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       201:
 *         description: Timetable created successfully
 *       400:
 *         description: Invalid data provided
 *       403:
 *         description: Unauthorized access
 */
router.post('/', authenticate, authorization(['admin']), timetableController.createTimetable);

/**
 * @swagger
 * /timetables:
 *   get:
 *     summary: Get all timetables 
 *     tags: [Timetables]
 *     responses:
 *       200:
 *         description: A list of timetables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request
 */
router.get('/', timetableController.getTimetables);

/**
 * @swagger
 * /timetables/{id}:
 *   put:
 *     summary: Edit a timetable 
 *     tags: [Timetables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the timetable to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route:
 *                 type: string
 *               creater:
 *                 type: string
 *               validFrom:
 *                 type: string
 *                 format: date
 *               validTo:
 *                 type: string
 *                 format: date
 *               isActive:
 *                 type: boolean
 *               buses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bus:
 *                       type: string
 *                     departureLocation:
 *                       type: string
 *                     departureTime:
 *                       type: string
 *                       format: date-time
 *                     arrivalLocation:
 *                       type: string
 *                       format: date-time
 *                     stops:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       200:
 *         description: Timetable updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Timetable not found
 *       403:
 *         description: Unauthorized access
 */
router.put('/:id', authenticate, authorization(['admin']), timetableController.editTimetable);

/**
 * @swagger
 * /timetables/{id}:
 *   delete:
 *     summary: Delete a timetable
 *     tags: [Timetables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the timetable to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Timetable deleted successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Timetable not found
 *       403:
 *         description: Unauthorized access
 */
router.delete('/:id', authenticate, authorization(['admin']), timetableController.deleteTimetable);

module.exports = router;






// /**
//  * @swagger
//  * /timetables:
//  *   get:
//  *     summary: Retrieve timetables with optional filters
//  *     tags: [Timetables]
//  *     parameters:
//  *       - name: route
//  *         in: query
//  *         required: false
//  *         description: ID of the route
//  *         schema:
//  *           type: string
//  *       - name: creater
//  *         in: query
//  *         required: false
//  *         description: ID of the user who created the timetable
//  *         schema:
//  *           type: string
//  *       - name: validFrom
//  *         in: query
//  *         required: false
//  *         description: Filter timetables starting from this date (inclusive)
//  *         schema:
//  *           type: string
//  *           format: date
//  *       - name: validTo
//  *         in: query
//  *         required: false
//  *         description: Filter timetables ending before this date (inclusive)
//  *         schema:
//  *           type: string
//  *           format: date
//  *       - name: isActive
//  *         in: query
//  *         required: false
//  *         description: Filter timetables based on active status (true/false)
//  *         schema:
//  *           type: boolean
//  *       - name: departureLocation
//  *         in: query
//  *         required: false
//  *         description: Filter timetables by departure location
//  *         schema:
//  *           type: string
//  *       - name: arrivalLocation
//  *         in: query
//  *         required: false
//  *         description: Filter timetables by arrival location
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: A list of timetables matching the filters
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   _id:
//  *                     type: string
//  *                     description: Timetable header ID
//  *                   route:
//  *                     type: string
//  *                     description: Route ID
//  *                   creater:
//  *                     type: string
//  *                     description: Creator user ID
//  *                   validFrom:
//  *                     type: string
//  *                     format: date-time
//  *                   validTo:
//  *                     type: string
//  *                     format: date-time
//  *                   isActive:
//  *                     type: boolean
//  *                   createdAt:
//  *                     type: string
//  *                     format: date-time
//  *                   details:
//  *                     type: array
//  *                     description: List of timetable body details
//  *                     items:
//  *                       type: object
//  *                       properties:
//  *                         headerId:
//  *                           type: string
//  *                           description: Reference to the timetable header ID
//  *                         bus:
//  *                           type: string
//  *                           description: Bus ID
//  *                         departureLocation:
//  *                           type: string
//  *                         departureTime:
//  *                           type: string
//  *                           format: date-time
//  *                         arrivalLocation:
//  *                           type: string
//  *                         arrivalTime:
//  *                           type: string
//  *                           format: date-time
//  *                         stops:
//  *                           type: array
//  *                           items:
//  *                             type: string
//  *       500:
//  *         description: Internal server error
//  */
// router.get('/', timetableController.getTimetables);