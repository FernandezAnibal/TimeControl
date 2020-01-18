const empleadoCtrl = {};

const Empleado = require('../models/Empleado');

empleadoCtrl.getEmpleados = async (req, res) => { 
    const empleado = await Empleado.find();
    res.json(empleado);
}

empleadoCtrl.createEmpleados = async (req, res) => {
    const newEmpleado = new Empleado(
        {
        empleado:req.body.empleado, 
        legajo : req.body.legajo
    });
    await newEmpleado.save();
    res.json(newEmpleado)
}

empleadoCtrl.updateEmpleado = async (req, res) => {
    
    var newempleado = await Empleado.findOne( {
        _id: req.params.id,
        "maquinas.maquina": req.body.maquina
    })
    
    if(!newempleado){
    newempleado = await Empleado.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $addToSet:{
                maquinas : {"maquina":req.body.maquina}
            }
        }
        )
    }
    
    newempleado = await Empleado.findOneAndUpdate(
            {
                _id: req.params.id,
                "maquinas.maquina": req.body.maquina
            },
            {
                $addToSet:{
                    "maquinas.$.intervalosT" :
                    {
                        operacion: req.body.operacion,
                        check: (Date.now().toString())
                    }
                }
            },
            {multi: true}, function (err, result)
            { console.log(result)}
            )

   res.json(newempleado)
}


empleadoCtrl.getEmpleado = async (req, res) => 
{
    const empleado = await Empleado.findById(req.params.id); 
    console.log(empleado);
    res.json(empleado)
}

empleadoCtrl.deleteEmpleado = async (req, res) => 
{
    const empleado = await Empleado.findOneAndDelete(req.params.id); 
    console.log(empleado);
    res.json({title: 'Deleted Empleado'})
}
module.exports = empleadoCtrl;