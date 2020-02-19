const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const intervaloTSchema = new Schema({
    empleado: String,
    legajo: Number,
    operacion: String,
    cantidad: String,
    checkTime: String,
})

const maquinaSchema = new Schema({
    maquina : String,
    intervalosT: [intervaloTSchema],
    "_id": false
})

const procesoSchema = new Schema({
    proceso: String,
    cantidadA: Number,
    maquinas: [maquinaSchema],
})

procesoSchema.plugin(AutoIncrement, {inc_field: 'id',start_seq: 100000});


const posicionSchema = new Schema({
    posicion : String,
    ejecucion: String,
    cantidad: Number,
    listo: Boolean,
    procesos:[procesoSchema]
})

module.exports = model('Posicion', posicionSchema);