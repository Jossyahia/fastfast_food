const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['Swallow', 'Rice', 'Drink', 'Smallchop', 'Shawama'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});

foodSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//foodSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Food', foodSchema);