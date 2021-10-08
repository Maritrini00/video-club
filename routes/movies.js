const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

/* GET users listing. */
router.get('/', controller.list);

router.get('/:id',controller.index);

router.post('/',controller.create);

router.put('/:id',controller.replace);

router.patch('/:id',controller.edit);

router.delete('/:id',controller.destroy);

router.post('/add/actor',controller.addActor);

module.exports = router;