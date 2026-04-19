import express from 'express';
import { processQuery } from '../controllers/queryController.js';

const router = express.Router();

router.post('/ask', processQuery);

export default router;