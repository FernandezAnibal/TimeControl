const {Schema, model} = require('mongoose');

const intervaloTSchema = new Schema({
    empleado: String,
    legajo: Number,
    operacion: String,
    checkTime: String
})

const maquinaSchema = new Schema({
    maquina : String,
    intervalosT: [intervaloTSchema]
})

const procesoSchema = new Schema({
    proceso: String,
    cantidadR: Number,
    cantidadA: Number,
    maquinas: [maquinaSchema]
})


const posicionSchema = new Schema({
    nombre : String,
    ejecucion: String,
    cantidad: Number,
    listo: Boolean,
    procesos:[procesoSchema]
})

module.exports = model('Posicion', posicionSchema);