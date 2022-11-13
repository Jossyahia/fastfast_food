const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

/**
 * App Routes 
*/
router.get('/', foodController.homepage);
router.get('/food/:id', foodController.exploreFood );
router.get('/categories', foodController.exploreCategories);
router.get('/categories/:id', foodController.exploreCategoriesById);
router.post('/search', foodController.searchFood);
router.get('/explore-latest', foodController.exploreLatest);
router.get('/explore-random', foodController.exploreRandom);
router.get('/submit-food', foodController.submitFood);
router.post('/submit-food', foodController.submitFoodOnPost);

 
module.exports = router;