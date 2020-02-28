const posicionCtrl ={};

const Posicion = require('../models/Posicion');

posicionCtrl.getPosiciones = async (req, res) => {
    const posiciones = await Posicion.find();
    res.json(posiciones);
}

posicionCtrl.createPosicion = async (req, res) => 
{
    let existe = false;
    const {posicion, ejecucion, cantidad, procesos} = req.body;

    var newPosicion = await Posicion.findOne({
        posicion,
        ejecucion
    });

    if(newPosicion){ existe = true }

    if (!newPosicion){
    newPosicion = new Posicion({
        posicion,
        ejecucion,
        cantidad,
        procesos
    })
    
    await newPosicion.save();
    }
    if (existe){
        res.json("Ya Existe");
    }
    else 
    {
        res.json(newPosicion);
    }
    
    
}

posicionCtrl.updatePosicion = async (req, res)=>
{
    let existe = false;
    const {posicion, ejecucion, proceso, cantidadA, maquina, empleado, legajo, operacion} = req.body;
    var newPosicion = await Posicion.findOne({ejecucion, posicion});


    for (let index = 0; index < newPosicion.procesos.length; index++) {
        if (newPosicion.procesos[index].proceso == proceso ){
            for (let index2 = 0; index2 < newPosicion.procesos[index].maquinas.length; index2++) {
                if(newPosicion.procesos[index].maquinas[index2].maquina == maquina){
                    existe = true;
                    console.log("Existe")
                }
            }
        }
    }        

    if(!existe){
        var newPosition = await Posicion.findOneAndUpdate(
            {
                posicion,
                ejecucion,
                "procesos.proceso" : proceso,
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
    }

    var newPosition2 = await Posicion.findOneAndUpdate(
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
                    cantidad : cantidadA,
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
    
    const {id} = req.query;
    const newPosicion = await Posicion.findOne({
        "procesos.id":id
    });
    res.json(newPosicion);
}

posicionCtrl.getPosicionClose = async (req, res) => 
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

