const express = require('express');
const {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
	addFavoriteProduct,
	removeFavoriteProduct,
	getFavoriteProducts,
} = require('../controllers/user-controller.js');
const { protect, isAdmin } = require('../middleware/auth-middleware.js');

const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router
	.route('/:id')
	.delete(protect, isAdmin, deleteUser)
	.get(protect, isAdmin, getUserById)
	.put(protect, isAdmin, updateUser);

router
	.route('/:id/favorites')
	.get(protect, getFavoriteProducts)
	.post(protect, addFavoriteProduct);
router
	.route('/:id/favorites/:productId')
	.delete(protect, removeFavoriteProduct);

module.exports = router;