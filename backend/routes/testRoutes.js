import express from 'express';
import { testControllers } from '../controllers/testControllers.js';


// Routes object
const router = express.Router();

// routes
router.post("/test-post",testControllers)

// export 
export default router