import express from 'express';
const router = express.Router();
import userRoutes from './userRoutes.js'
userRoutes(router)

export default router;