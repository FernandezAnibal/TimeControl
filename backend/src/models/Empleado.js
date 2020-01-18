const {Schema, model} = require('mongoose');

const intervaloTSchema = new Schema({
    operacion: String,
    check: String
})

const maquinaSchema = new Schema({
    maquina: {type:String, unique: true},
    intervalosT:[intervaloTSchema]
})

const empleadoSchema = new Schema({
    empleado : String,
    legajo: {type: String, required: true, unique: true, trim: true },
    maquinas: [maquinaSchema]
       
})

module.exports = model('Empleado', empleadoSchema);