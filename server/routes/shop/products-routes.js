const express = require('express');
const {getFilterProducts, getProductDetails} = require('../../controllers/shop/products-controller');
const { upload } = require('../../helpers/cloudinary')

const router = express.Router();

router.get("/get", getFilterProducts);
router.get("/get/:id", getProductDetails);

module.exports = router;
