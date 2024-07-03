const express = require('express');
const router = express.Router();
const Email = require('../models/Email');

// Route to save new email
router.post('/emails', async (req, res) => {
  try {
    const { email } = req.body;
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json(newEmail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/emails', async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
