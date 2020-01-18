const {Router} = require('express');
const router = Router();

const {getEmpleados, createEmpleados, getEmpleado , deleteEmpleado, updateEmpleado} = require('../controllers/empleados.controller')

router.route('/')
    .get(getEmpleados)     
    .post(createEmpleados)

router.route('/:id')
    .get(getEmpleado)  
    .delete(deleteEmpleado)   
    .put(updateEmpleado)
    

module.exports = router;