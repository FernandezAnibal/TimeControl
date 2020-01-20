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
    
    const{maquina, operacion} = req.body;

    // Agrega una nueva máquina si no existe
    var newempleado = await Empleado.findOneAndUpdate(
        {
            _id: req.params.id,
            "maquinas.maquina":{$ne:maquina}
        },
        {
            $addToSet:{
                maquinas : {maquina}
            }
        }
        )
    
    //Añade un checkpoint para su uso
    newempleado = await Empleado.findOneAndUpdate(
            {
                _id: req.params.id,
                "maquinas.maquina": maquina
            },
            {
                $addToSet:{
                    "maquinas.$.intervalosT" :
                    {
                        operacion,
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
    const empleado = await Empleado.findOneAndDelete({"_id":req.params.id}); 
    console.log(empleado);
    res.json({title: 'EmpleadoBorrado'});
}
module.exports = empleadoCtrl;