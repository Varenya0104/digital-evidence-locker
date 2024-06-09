const mongoose = require('mongoose');
const EvidenceSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadDate: { type: Date, default: Date.now },
    chainOfCustody: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
    }],
});
module.exports = mongoose.model('Evidence', EvidenceSchema);
