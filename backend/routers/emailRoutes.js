// routers/emailRoutes.js

import express from 'express';
import Email from '../models/Email.js';

const router = express.Router();

// Add email
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const newEmail = await Email.create({ email });
    res.status(201).json(newEmail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all emails
router.get('/', async (req, res) => {
  try {
    const emails = await Email.find();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
