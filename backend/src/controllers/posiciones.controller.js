const posicionCtrl ={};

const Posicion = require('../models/Posicion');

posicionCtrl.getPosiciones = async (req, res) => {
    const posiciones = await Posicion.find();
    res.json(posiciones);
}

posicionCtrl.createPosicion = async (req, res) => 
{
    const {nombre, ejecucion, cantidad, procesos} = req.body;

    var newPosicion = await Posicion.findOne({
        nombre,
        ejecucion
    });
    if (!newPosicion){
    newPosicion = new Posicion({
        nombre,
        ejecucion,
        cantidad,
        procesos
    })
    
    await newPosicion.save();
    }
    res.json(newPosicion);
}

posicionCtrl.updatePosicion = async (req, res)=>
{
    const {nombre, ejecucion, proceso, cantidadR, cantidadA, maquina, empleado, legajo, operacion} = req.body;

    var newPosition = await Posicion.findOneAndUpdate(
        {
            nombre,
            ejecucion,
            "procesos.proceso" : proceso,
            "procesos.maquinas.maquina": {$ne:maquina}
        },
        {           
            $addToSet: 
            {
                "procesos.$.maquinas":
                {
                    maquina,
                }
            }
        },function (err, result)
        { console.log(result)}
    )

    newPosition = await Posicion.findOneAndUpdate(
        {
            nombre,
            ejecucion,
            "procesos.proceso" : proceso,
            "procesos.maquinas.maquina": maquina
        },
        {
            $set:{
                "procesos.$.cantidadR":cantidadR,
                "procesos.$.cantidadA":cantidadA
            },
            $push: 
            {
                "procesos.$.maquinas.$[x].intervalosT":
                {
                    empleado,
                    legajo,
                    operacion,
                    checkTime :  (Date.now().toString())
                }
            }
        }, 
        { 
            "arrayFilters":[{"x.maquina":maquina}],
             new :true
        }
    )

        res.json(newPosition);
}

posicionCtrl.getPosicion = async (req, res) => 
{
    const posicion = await Posicion.findById(req.params.id);
    res.json(posicion)
}

posicionCtrl.deletePosicion = async (req, res) =>
{
    const posicion = await Posicion.findOneAndDelete(req.params.id);
    res.json(posicion);
}

module.exports = posicionCtrl;