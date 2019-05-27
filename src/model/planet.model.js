const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Campo obrigatório'],
        unique: true
    },
    climate: {
        type: String,
        required: [true, 'Campo obrigatório'],
    },
    terrain: {
        type: String,
        required: [true, 'Campo obrigatório']
    }
}, { collection: 'planet' });

module.exports = mongoose.model('Planet', schema);