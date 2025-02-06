const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('your_mongodb_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  { name: 'Fresh Apples', price: 200, img: '/assets/ProductImages/apple.jpeg' },
  { name: 'Organic Bananas', price: 130, img: '/assets/ProductImages/banana.jpeg' },
  { name: 'Black Grapes', price: 250, img: '/assets/ProductImages/grapes.jpg' },
  { name: 'Oranges', price: 140, img: '/assets/ProductImages/orange.jpg' },
  { name: 'Watermelon', price: 160, img: '/assets/ProductImages/watermelon.jpg' },
  { name: 'Tomato', price: 60, img: '/assets/ProductImages/tomato.jpg' },
  { name: 'Carrot', price: 60, img: '/assets/ProductImages/carrot.jpg' },
  { name: 'Cabbage', price: 40, img: '/assets/ProductImages/cabbage.jpg' },
  { name: 'Potato', price: 45, img: '/assets/ProductImages/potato.jpg' },
  { name: 'Onion', price: 70, img: '/assets/ProductImages/onion.jpg' }
];

Product.insertMany(products)
  .then(() => {
    console.log('Products Inserted');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
