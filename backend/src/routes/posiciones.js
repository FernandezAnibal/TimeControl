const {Router} = require('express');
const router = Router();

const {getPosiciones, createPosicion, getPosicion, deletePosicion, updatePosicion, getPosicionClose} = require('../controllers/posiciones.controller')

router.route('/')
    .get(getPosiciones)
    .post(createPosicion)
router.route('/:id')
    .get(getPosicion)
    .delete(deletePosicion)
    .put(updatePosicion)

router.route('/1/close')
    .get(getPosicionClose)
module.exports = router;