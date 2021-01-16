const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          index: '2dsphere',
          required: true,
        }
      }
});

module.exports = mongoose.model('Location', LocationSchema);