require('../models/database');
const Category = require('../models/Category');
const Food = require('../models/Food');

/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Food.find({}).sort({_id: -1}).limit(limitNumber);
    const swallow = await Food.find({ 'category': 'Swallow' }).limit(limitNumber);
    const rice = await Food.find({ 'category': 'Rice' }).limit(limitNumber);
    const drink = await Food.find({ 'category': 'Drink' }).limit(limitNumber);

    const food = { latest, swallow, rice, drink };

    res.render('index', { title: 'Fastfast Food Delivery - Home', categories, food } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Fastfast Food Delivery - Categoreis', categories } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Food.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Fastfast Food Delivery - Categoreis', categoryById } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 
 
/**
 * GET /food/:id
 * Food 
*/
exports.exploreFood = async(req, res) => {
  try {
    let foodId = req.params.id;
    const food = await Food.findById(foodId);
    res.render('food', { title: 'Fastfast Food Delivery - Food', food } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * POST /search
 * Search 
*/
exports.searchFood = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let food = await Food.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Fastfast Food Delivery - Search', food } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
  
}

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const food = await Food.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Fastfast Food Delivery - Explore Latest', food } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 



/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Food.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let food = await Food.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Fastfast Food Delivery - Explore Latest', food } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /submit-food
 * Submit Food
*/

exports.submitFood = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-food', {title: 'Fastfast Food Delivery - Submit Food', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-food
 * Submit Food
*/
exports.submitFoodOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newFood = new Food({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newFood.save();

    req.flash('infoSubmit', 'Food has been added.')
    res.redirect('/submit-food');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-food');
  }
}




// Delete Food
// async function deleteFood(){
//   try {
//     await Food.deleteOne({ name: 'New Food From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteFood();


// Update Food
// async function updateFood(){
//   try {
//     const res = await Food.updateOne({ name: 'New Food' }, { name: 'New Food Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateFood();


/**
 * Dummy Data Example 
*/

// async function insertDymmyCategoryData(){
//   try {
//     await Category.insertMany([
//       {
//         "name": "Swallow",
//         "image": "swallow-food.jpg"
//       },
//       {
//         "name": "Rice",
//         "image": "rice-food.jpg"
//       }, 
//       {
//         "name": "Drink",
//         "image": "drink-food.jpg"
//       },
//       {
//         "name": "Smallchop",
//         "image": "smallchop-food.jpg"
//       }, 
//       {
//         "name": "Shawama",
//         "image": "shawama-food.jpg"
//       },
//       {
//         "name": "Others",
//         "image": "others-food.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyCategoryData();


// async function insertDymmyFoodData(){
//   try {
//     await Food.insertMany([
//       { 
//         "name": "Food Name Goes Here",
//         "description": `Food Description Goes Here`,
//         "email": "foodemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Rice", 
//         "image": "southern-friend-chicken.jpg"
//       },
//       { 
//         "name": "Food Name Goes Here",
//         "description": `Food Description Goes Here`,
//         "email": "foodemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Rice", 
//         "image": "southern-friend-chicken.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyFoodData();

