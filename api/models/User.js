const mongoose = require("mongoose");
const { dateOfBirth } = require("mrz-parser/src/ocr-template/ocr-categories");
const schema = mongoose.Schema;
const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
    
  },
  company: {
    type: String,
    required: true,
    },
  isAdmin: {
    type: Boolean,
     default: false,
},
});
module.exports = mongoose.model("user", UserSchema);
