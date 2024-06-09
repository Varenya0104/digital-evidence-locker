const Evidence = require('../models/Evidence');

exports.uploadEvidence = async (req, res) => {
    try {
        const evidence = new Evidence({
            filename: req.file.filename,
            uploadedBy: req.user.id,
            chainOfCustody: [{ user: req.user.id }],
        });
        await evidence.save();
        res.status(201).json({ msg: 'Evidence uploaded successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getEvidence = async (req, res) => {
    try {
        const evidence = await Evidence.find().populate('uploadedBy', ['username', 'role']);
        res.json(evidence);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
