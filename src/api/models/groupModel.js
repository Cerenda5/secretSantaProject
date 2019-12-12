const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let groupSchema = new Schema({
  groupname: {
    type: String,
    required: "Le nom du groupe est requis"
  },
  id_group: {
    type: String,
  },
  description: {
    type: String,
  },
  created_at : {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Group', groupSchema);
