const { Model, DataTypes, Sequelize } = require('sequelize');

const PLANIFICATION_TABLE = 'Planifications';

class Planification extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: PLANIFICATION_TABLE,
            modelName: 'Planification',
            timestamps: true
        }
    }
} 

const PlanificationSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    demandeID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field:'demandeID'
    },
    
    equipeID:{
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'equipeID'
    } ,
    equipementID:{
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'equipementID'
    },
    vehiculeID:{
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'vehiculeID'
    }
   
}
  
module.exports = { Planification, PlanificationSchema };