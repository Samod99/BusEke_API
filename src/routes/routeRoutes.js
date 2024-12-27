const express = require('express');
const routeController = require('../controllers/routeController');
const router = express.Router();
const { authenticate, authorization } = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { createRouteSchema, updateRouteSchema } = require('../validators/routeValidator');

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Route management endpoints
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Search routes
 *     tags: [Routes]
 *     parameters:
 *       - name: routeNumber
 *         in: query
 *         description: Filter by route number
 *         schema:
 *           type: string
 *       - name: startLocation
 *         in: query
 *         description: Filter by start location
 *         schema:
 *           type: string
 *       - name: endLocation
 *         in: query
 *         description: Filter by end location
 *         schema:
 *           type: string
 *       - name: stops
 *         in: query
 *         description: Filter by stops
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of routes matching the filters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/', routeController.searchRoutes);

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - routeNumber
 *               - startLocation
 *               - endLocation
 *               - stops
 *               - distance
 *               - averageSpeed
 *               - duration
 *             properties:
 *               routeNumber:
 *                 type: string
 *               startLocation:
 *                 type: string
 *               endLocation:
 *                 type: string
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *               distance:
 *                 type: number
 *               averageSpeed:
 *                 type: number
 *               duration:
 *                 type: number
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Missing required fields or validation error
 *       409:
 *         description: Route with the same routeNumber already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, authorization(['admin']), validate(createRouteSchema), routeController.createRoute);

/**
 * @swagger
 * /routes/{routeId}:
 *   get:
 *     summary: Get a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - name: routeId
 *         in: path
 *         required: true
 *         description: The ID of the route to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route details
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */
router.get('/:routeId', routeController.getRouteById);

/**
 * @swagger
 * /routes/{id}:
 *   put:
 *     summary: Update a route
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the route to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeNumber:
 *                 type: string
 *               startLocation:
 *                 type: string
 *               endLocation:
 *                 type: string
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *               distance:
 *                 type: number
 *               averageSpeed:
 *                 type: number
 *               duration:
 *                 type: number
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, authorization(['admin']), validate(updateRouteSchema), routeController.updateRoute);

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Delete a route
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the route to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, authorization(['admin']), routeController.deleteRoute);

module.exports = router;
