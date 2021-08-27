const express = require('express');
const router = express.Router();

const catchAsync = require('../errorHandling/catchAsync');

const { isLoggedIn,validateMedicine,isAuthor } = require('../middleware');

const contribute = require('../controllers/contributeControllers');

//routes

router.route('/')
    .get(catchAsync(contribute.index))
    .post(isLoggedIn,validateMedicine,catchAsync(contribute.newMedicine));
    
router.get('/new', isLoggedIn, contribute.contributeMeds);

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(contribute.deleteMedicine));

module.exports = router;