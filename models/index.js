const { Planification, PlanificationSchema } = require('./planification.molde');

function setupModels(sequelize) {
    Planification.init(PlanificationSchema, Planification.config(sequelize));
}

module.exports = setupModels;