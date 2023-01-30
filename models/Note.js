const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    // ! roles is Array
    text: [
      {
        type: String,
        require: true,
      },
    ],
    complete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: ' ticketNums',
    start_seq: 500
})

module.exports = mongoose.model("Note", noteSchema);
