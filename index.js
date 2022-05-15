const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./config/db.js');
const productRoutes = require('./routes/product-routes.js');
const userRoutes = require('./routes/user-routes.js');
const orderRoutes = require('./routes/order-routes.js');
const paymentRoutes = require('./routes/payment-routes.js');
const uploadRoutes = require('./routes/upload-routes.js');
const { notFound, errorHandler } = require('./middleware/error-middleware.js');

// define environment variables
dotenv.config();

// start connection
connectDb();

// create api server
const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// accept json data in the body
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/upload', uploadRoutes);

// make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// set frontend build folder as a static folder
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.send('API is runninmg');
	});
}

// not found middleware
app.use(notFound);

// custom error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);