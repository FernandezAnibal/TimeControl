const {Schema, model} = require('mongoose');

const intervaloTSchema = new Schema({
    empleado: String,
    legajo: Number,
    operacion: String,
    checkTime: String,
})

const maquinaSchema = new Schema({
    maquina : String,
    intervalosT: [intervaloTSchema],
    "_id": false
})

const procesoSchema = new Schema({
    proceso: String,
    cantidadR: Number,
    cantidadA: Number,
    maquinas: [maquinaSchema],
    "_id": false
})


const posicionSchema = new Schema({
    nombre : String,
    ejecucion: String,
    cantidad: Number,
    listo: Boolean,
    procesos:[procesoSchema]
})

module.exports = model('Posicion', posicionSchema);