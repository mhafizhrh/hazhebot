const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const commandsSchema = new Schema({
    type: {
        type: String,
    },
    path: {
        type: String,
    },
    commands: {
        type: Array,
    },
    is_active: {
        type: Boolean,
    },
});

module.exports = mongoose.model("command", commandsSchema);
