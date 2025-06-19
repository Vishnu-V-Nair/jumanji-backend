const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');
const {
  getListings,
  getListingById,
  createListing
} = require('../controllers/listingController');

router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/', verifyToken, isAdmin, upload.array('images', 5), createListing);

module.exports = router;