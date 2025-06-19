const Listing = require('../models/Listing');

exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch {
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
};

exports.createListing = async (req, res) => {
  try {
    const { title, description, location, pricePerNight } = req.body;
    const imageUrls = req.files.map(file => file.path);

    const listing = await Listing.create({
      title,
      description,
      location,
      pricePerNight,
      images: imageUrls,
      owner: req.user.id
    });

    res.status(201).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
};