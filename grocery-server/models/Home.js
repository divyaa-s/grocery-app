const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  banners: [
    {
      image: {
        type: String,
        required: true,
      },
      link: {
        type: String,
      },
    },
  ],
  featuredProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to Product model
    },
  ],
  announcements: {
    type: String,
    default: '',
  },
});

const Home = mongoose.model('Home', HomeSchema);

module.exports = Home;
