const { models } = require('../config/sequelize');

class PlanificationService {

  constructor() { }

  async find() {
    const res = await models.Planification.findAll();
    return res;
  }

  async findOne(id) {
    const res = await models.Planification.findByPk(id);
    return res;
  }

  async create(data) {
    const res = await models.Planification.create(data);
    return res;
  }

  async update(id, data) {
    const model = await this.findOne(id);
    const res = await model.update(data);
    return res;
  }


  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { deleted: true };
  }
  async findByDemandeID(demandeID) {


    const res = await models.Planification.findOne({ where: { demandeID } });

    return res;
  }

  async planVehicule(demandeID, data) {


    const planification = await models.Planification.findOne({ where: { demandeID } });
    if (planification) {

      planification.dataValues.vehicule = data.vehiculeID
      console.log(planification);


      const res = await models.Planification.update({ vehiculeID: data.vehiculeID }, {
        where: {
          id: planification.dataValues.id
        }
      })
      console.log(res);

    }
    return planification;
  }


  async planEquipe(demandeID, data) {


    const planification = await models.Planification.findOne({ where: { demandeID } });
    if (planification) {

      planification.dataValues.equipe = data.equipeID
      console.log(planification);
      console.log(data);


      const res = await models.Planification.update({ equipeID: data.equipeID }, {
        where: {
          id: planification.dataValues.id
        }
      })
      console.log(res);

    }
    return planification;
  }

  async planEquipement(demandeID, data) {


  const planification = await models.Planification.findOne({ where: { demandeID } });
  if (planification) {

    planification.dataValues.equipement = data.equipementID
    console.log(planification);


    const res = await models.Planification.update({ equipementID: data.equipementID }, {
      where: {
        id: planification.dataValues.id
      }
    })
    console.log(res);

  }
  return planification;
}
}

   
 
 
 
module.exports = PlanificationService;