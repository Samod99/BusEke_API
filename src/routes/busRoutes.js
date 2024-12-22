const express = require('express');
const busController = require('../controllers/busController');
const router = express.Router();
const { authenticate, authorization } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: Bus management endpoints
 */

/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busNumber
 *               - capacity
 *               - routeId
 *               - operatorId
 *               - ownershipType
 *             properties:
 *               busNumber:
 *                 type: string
 *               capacity:
 *                 type: number
 *               routeId:
 *                 type: string
 *               operatorId:
 *                 type: string
 *               seatCount:
 *                 type: number
 *               ownershipType:
 *                 type: string
 *                 enum:
 *                   - SLTB
 *                   - PRIVATE
 *     responses:
 *       201:
 *         description: Bus created successfully
 *       400:
 *         description: Missing or invalid fields
 *       404:
 *         description: Associated route or operator not found
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, authorization(['operator']), busController.createBus);

/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Search buses
 *     tags: [Buses]
 *     parameters:
 *       - name: busNumber
 *         in: query
 *         description: Filter by bus number
 *         schema:
 *           type: string
 *       - name: capacity
 *         in: query
 *         description: Filter by bus capacity
 *         schema:
 *           type: number
 *       - name: routeId
 *         in: query
 *         description: Filter by associated route ID
 *         schema:
 *           type: string
 *       - name: operatorId
 *         in: query
 *         description: Filter by associated operator ID
 *         schema:
 *           type: string
 *       - name: ownershipType
 *         in: query
 *         description: Filter by ownership type (SLTB or PRIVATE)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of buses matching the criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/', busController.searchBuses);

/**
 * @swagger
 * /buses/{busId}:
 *   get:
 *     summary: Get a bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - name: busId
 *         in: path
 *         required: true
 *         description: The ID of the bus to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bus details
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Internal server error
 */
router.get('/:busId', busController.getBusById);

/**
 * @swagger
 * /buses/{id}:
 *   put:
 *     summary: Update a bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the bus to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *               capacity:
 *                 type: number
 *               routeId:
 *                 type: string
 *               operatorId:
 *                 type: string
 *               seatCount:
 *                 type: number
 *               ownershipType:
 *                 type: string
 *                 enum:
 *                   - SLTB
 *                   - PRIVATE
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, authorization(['operator']), busController.updateBus);

/**
 * @swagger
 * /buses/{id}:
 *   delete:
 *     summary: Delete a bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the bus to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, authorization(['operator']), busController.deleteBus);

module.exports = router;
