const maquinaCtrl = {};

const Maquina = require('../models/Maquina');

maquinaCtrl.getMaquinas = async (req, res) => { 
    const maquinas = await Maquina.find();
    res.json(maquinas);
}


maquinaCtrl.createMaquina = async (req, res) => {
    const{maquina} = req.body;
    var newMaquina = await Maquina.findOne({
        maquina
    })

    if(!newMaquina) {
    newMaquina = new Maquina({
        maquina,
        procesoA : "",
        empleadoA: "",
        estado:"inactiva"
    });
    await newMaquina.save()
    res.json({mensaje: "Maquina Creada"})
    }
    else{
        res.json({mensaje: "Maquina ya Existe"})
    }
    
}

maquinaCtrl.updateMaquina = async (req, res) => {
    const{proceso, empleado, estado, ejecucion, operacion, posicion} = req.body;
    var newMaquina = await Maquina.findOneAndUpdate(req.params.id,
       {
            procesoA : proceso,
            empleadoA: empleado,
            estado,
            $push :{trabajos:
                {
                    ejecucion,
                    posicion,
                    proceso,
                    empleado,
                    operacion,
                    checkTime: (Date.now().toString())

                }
            }
        }        
    )
    res.json(newMaquina)
}


maquinaCtrl.getMaquina = async (req, res) => 
{
    const maquina = await Maquina.findById(req.params.id);
    res.json({mensaje: maquina})
}

maquinaCtrl.deleteMaquina = async (req, res) => 
{
    const maquina = await Maquina.findOneAndDelete(req.params.id);
    res.json({mensaje: 'borrar maquina'})
}
module.exports = maquinaCtrl;