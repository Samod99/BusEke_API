const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authenticate, authorization } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API for managing bookings
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingNumber:
 *                 type: number
 *                 description: Unique booking number
 *               bus:
 *                 type: string
 *                 description: ID of the bus
 *               passengerName:
 *                 type: string
 *               passengerIDNo:
 *                 type: string
 *               passengerMobile:
 *                 type: string
 *               startLocation:
 *                 type: string
 *               endLocation:
 *                 type: string
 *               seatCount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *               isPaid:
 *                 type: boolean
 *               isCancelled:
 *                 type: boolean
 *               isUsed:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *               bookingIdentificationCode:
 *                 type: string
 *                 description: Unique booking code
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad request
 */
router.post('/', bookingController.createBooking);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Internal server error
 */
router.get('/', bookingController.getBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a single booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', bookingController.getBookingById);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingNumber:
 *                 type: number
 *               bus:
 *                 type: string
 *               passengerName:
 *                 type: string
 *               passengerIDNo:
 *                 type: string
 *               passengerMobile:
 *                 type: string
 *               startLocation:
 *                 type: string
 *               endLocation:
 *                 type: string
 *               seatCount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *               isPaid:
 *                 type: boolean
 *               isCancelled:
 *                 type: boolean
 *               isUsed:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *               bookingIdentificationCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       404:
 *         description: Booking not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', bookingController.updateBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;




















// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Booking:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *         bookingNumber:
//  *           type: number
//  *         bus:
//  *           type: string
//  *         passengerName:
//  *           type: string
//  *         passengerIDNo:
//  *           type: string
//  *         passengerMobile:
//  *           type: string
//  *         startLocation:
//  *           type: string
//  *         endLocation:
//  *           type: string
//  *         seatCount:
//  *           type: number
//  *         date:
//  *           type: string
//  *           format: date
//  *         time:
//  *           type: string
//  *           format: date-time
//  *         price:
//  *           type: number
//  *         isPaid:
//  *           type: boolean
//  *         isCancelled:
//  *           type: boolean
//  *         isUsed:
//  *           type: boolean
//  *         isActive:
//  *           type: boolean
//  *         bookingIdentificationCode:
//  *           type: string
//  */
