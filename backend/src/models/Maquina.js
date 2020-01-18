const {Schema, model} = require('mongoose');

const trabajoSchema = new Schema({
    ejecucion: String,
    posicion : String,
    proceso: String,
    checkTime: String,
    empleado: String,
    operacion: String
})

const maquinaShema = new Schema({
    maquina : {type: String, unique: true},
    procesoA: String,
    empleadoA: String,
    estado: String,
    trabajos:[trabajoSchema]            
})

module.exports = model('Maquina', maquinaShema);