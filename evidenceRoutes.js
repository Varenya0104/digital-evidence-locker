const express = require('express');
const router = express.Router();
const { uploadEvidence, getEvidence } = require('../controllers/evidenceController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
router.post('/upload', auth, upload.single('file'), uploadEvidence);
router.get('/', auth, getEvidence);
module.exports = router;
