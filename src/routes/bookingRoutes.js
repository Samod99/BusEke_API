const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authenticate, authorization } = require('../middleware/authMiddleware');
const router = express.Router();
const validate = require('../middleware/validationMiddleware');
const { createBookingSchema, updateBookingSchema } = require('../validators/bookingValidator');

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
 *       400:
 *         description: Bad request
 */
router.post('/', bookingController.createBooking); 

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: 
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: busNumber
 *         schema:
 *           type: string
 *         description: Filter bookings by bus number
 *       - in: query
 *         name: passengerIDNo
 *         schema:
 *           type: string
 *         description: Filter bookings by passenger ID number
 *       - in: query
 *         name: bookingIdentificationCode
 *         schema:
 *           type: string
 *         description: Filter bookings by booking identification code
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter bookings by date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                   description: Total number of bookings retrieved
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       busNumber:
 *                         type: string
 *                       passengerName:
 *                         type: string
 *                       passengerIDNo:
 *                         type: string
 *                       passengerMobile:
 *                         type: string
 *                       startLocation:
 *                         type: string
 *                       endLocation:
 *                         type: string
 *                       seatCount:
 *                         type: integer
 *                       date:
 *                         type: string
 *                         format: date
 *                       time:
 *                         type: string
 *                         format: date-time
 *                       price:
 *                         type: number
 *                       isPaid:
 *                         type: boolean
 *                       isCancelled:
 *                         type: boolean
 *                       isUsed:
 *                         type: boolean
 *                       isActive:
 *                         type: boolean
 *                       bookingIdentificationCode:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/', authenticate, authorization(['operator']), bookingController.getBookings); 

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
 *     security:
 *       - bearerAuth: []
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
router.put('/:id', authenticate, authorization(['operator']), bookingController.updateBooking); 

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
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
router.delete('/:id', authenticate, authorization(['operator']), bookingController.deleteBooking);

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
