const {Router} = require('express');
const router = Router();

const {getMaquinas, createMaquina, getMaquina , deleteMaquina, updateMaquina} = require('../controllers/maquinas.controller')

router.route('/')
    .get(getMaquinas)     
    .post(createMaquina)

router.route('/:id')
    .get(getMaquina)  
    .delete(deleteMaquina)   
    .put(updateMaquina)
    

module.exports = router;