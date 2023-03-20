const express = require('express');
const movieController = require('../Controllers/movieController');

const router = express.Router();

router.param('id', movieController.checkId);
router.route('/').post(movieController.checkBody,movieController.uploadMovie);
router.route('/:id?').get(movieController.getMovies);
router.route('/:id')
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

module.exports = router;