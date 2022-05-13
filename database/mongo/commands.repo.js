const commandsModel = require("./commands.model");

module.exports = {
    create(data) {
        return commandsModel.create(data);
    },
    native: commandsModel,
};
