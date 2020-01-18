const posicionCtrl ={};

const Posicion = require('../models/Posicion');

posicionCtrl.getPosiciones = async (req, res) => {
    const posiciones = await Posicion.find();
    res.json(posiciones);
}

posicionCtrl.createPosicion = async (req, res) => 
{
    const {nombre, ejecucion, cantidad, procesos} = req.body;
    const newPosicion = new Posicion({
        nombre,
        ejecucion,
        cantidad,
        procesos
    })
    await newPosicion.save();
    res.json(newPosicion);
}

posicionCtrl.updatePosicion = async (req, res)=>
{
    const {nombre, ejecucion, proceso, cantidadR, cantidadA, maquina, empleado, legajo, operacion} = req.body;
    var newPosition = await Posicion.findOne(
        {
            nombre,
            ejecucion,
            "procesos.proceso" : proceso,
            "procesos.maquinas.maquina": maquina 
        }
    );
    
    if(!newPosition){
        newPosition = await Posicion.findOneAndUpdate(
            {
                nombre,
                ejecucion,
                "procesos.proceso" : proceso,
            },
            {
                $addToSet: 
                {
                    "procesos.$.maquinas":
                    {
                        maquina
                    }
                }
            },{multi: true}, function (err, result)
            { console.log(result)}
        )
    }

    newPosition = await Posicion.findOne(
        {
            nombre,
            ejecucion,
            "procesos.proceso" : proceso,
            "procesos.maquinas.maquina": maquina
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