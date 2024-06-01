const express = require('express');
const router = express.Router(); 
 
const planificationController = require('../controllers/planification.controller');

router.patch('/updatePriority/:id', planificationController.updatePriorite)

router.post('/create',planificationController.create)
router.get('/getPlanificationDemande/:id',planificationController.getPlanificationDemande)

router.put('/planEquipe/:id',planificationController.planEquipe)
router.put('/planVehicule/:id',planificationController.planVehicule)
router.put('/planEquipement/:id',planificationController.planEquipement)
     

module.exports = router;