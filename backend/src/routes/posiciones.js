const {Router} = require('express');
const router = Router();

const {getPosiciones, createPosicion, getPosicion, deletePosicion, updatePosicion} = require('../controllers/posiciones.controller')

router.route('/')
    .get(getPosiciones)
    .post(createPosicion)
router.route('/:id')
    .get(getPosicion)
    .delete(deletePosicion)
    .put(updatePosicion)

module.exports = router;