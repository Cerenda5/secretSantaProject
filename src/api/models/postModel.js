const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
  name: {
    type: String,
    required: "Le nom est requis"
  },
  id_group: {
    type: String,
  },
  wish: {
    type: String
  },
  created_at : {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
