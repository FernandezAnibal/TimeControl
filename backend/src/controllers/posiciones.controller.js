const posicionCtrl ={};

const Posicion = require('../models/Posicion');

posicionCtrl.getPosiciones = async (req, res) => {
    const posiciones = await Posicion.find();
    res.json(posiciones);
}

posicionCtrl.createPosicion = async (req, res) => 
{
    const {posicion, ejecucion, cantidad, procesos} = req.body;

    var newPosicion = await Posicion.findOne({
        posicion,
        ejecucion
    });
    if (!newPosicion){
    newPosicion = new Posicion({
        posicion,
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
    const {posicion, ejecucion, proceso, cantidadA, maquina, empleado, legajo, operacion} = req.body;
    var newPosition = await Posicion.findOneAndUpdate(
        {
            posicion,
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
        { }
    )

    newPosition = await Posicion.findOneAndUpdate(
        {
            posicion,
            ejecucion,
            "procesos.proceso" : proceso,
            "procesos.maquinas.maquina": maquina
        },
        {
            $set:{
                "procesos.$.cantidadA":cantidadA,
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

        res.json({mensaje: "posicion actualizada"});
}

posicionCtrl.getPosicion = async (req, res) => 
{   
    
    const {posicion, ejecucion} = req.query;
    const newPosicion = await Posicion.findOne({
        posicion,
        ejecucion
    });
    res.json(newPosicion);

}

posicionCtrl.deletePosicion = async (req, res) =>
{
    const posicion = await Posicion.findOneAndDelete(req.params.id);
    res.json(posicion);
}

module.exports = posicionCtrl;