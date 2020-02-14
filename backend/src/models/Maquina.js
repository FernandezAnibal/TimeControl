const {Schema, model} = require('mongoose');

const trabajoSchema = new Schema({
    ejecucion: String,
    posicion : String,
    proceso: String,
    checkTime: String,
    empleado: String,
    legajo: String,
    cantidad: String,
    operacion: String
})

const maquinaShema = new Schema({
    maquina : {type: String, unique: true},
    ejecucionA: String,
    procesoA: String,
    posicionA:String,
    empleadoA: String,
    legajoA: String,
    estado: String,
    trabajos:[trabajoSchema]            
})

module.exports = model('Maquina', maquinaShema);