
const axios=require('axios')
const PlanificationService = require('../services/planification.service');
const service = new PlanificationService();
const updatePriorite = async (req, res) => {
    try {
        console.log(req.body);
            const response = await axios.patch(`http://localhost:8000/demande/api/demande/updatePriorite/${req.params.id}`,req.body);
        console.log(response.data);
            res.json(response.data);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const planEquipe = async (req, res) => {
    try {
        const id=req.params.id
        const response = await service.planEquipe(id,req.body);
            res.json(response.data);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const planEquipement = async (req, res) => {
    try {
        const id=req.params.id
        const response = await service.planEquipement(id,req.body);
            res.json(response.data);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const planVehicule = async (req, res) => {
    try {
        const id=req.params.id
        const response = await service.planVehicule(id,req.body);
            res.json(response.data);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const create = async (req, res) => {
    try {
        data = {
            demandeID: req.body.demandeID,
        }
         const response = await service.create(data);
        console.log(response);
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message }); 
    }
}


const getPlanificationDemande = async (req, res) => {
    try {
        console.log(req.params.id);
        const plan = await service.findByDemandeID(req.params.id);
      
console.log(plan.dataValues);

            const response = await axios.get(`http://localhost:8000/demande/api/demande/${plan.dataValues.demandeID}`);
  
 console.log(plan.dataValues);

const result={
    demande:response.data,
    equipe:plan.dataValues.equipeID,
    equipement:plan.dataValues.equipementID,
    vehicule:plan.dataValues.vehiculeID
}
console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
module.exports={updatePriorite,create,getPlanificationDemande,planVehicule,planEquipe,planEquipement}