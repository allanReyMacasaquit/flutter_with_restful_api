import Cart from '../models/Cart.js';

export async function addCart(req, res) {
	try {
		const userId = req.user.id;
		const { cartItem, quantity = 1 } = req.body;

		let userCart = await Cart.findOne({ userId });

		if (!userCart) {
			userCart = new Cart({ userId, products: [{ cartItem, quantity }] });
		}

		const existingProduct = userCart.products.find((item) =>
			item.cartItem.equals(cartItem)
		);

		if (existingProduct) {
			existingProduct.quantity += quantity;
		} else {
			userCart.products.push({ cartItem, quantity });
		}

		await userCart.save();

		return res.status(200).json('Product added to cart');
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: `Error adding items to cart: ${error.message}` });
	}
}

export async function getCart(req, res) {
	try {
		const userId = req.user.id; // Destructure userId from parameters

		// Find the user's cart based on the userId
		const userCart = await Cart.findOne();

		if (!userCart) {
			return res.status(404).json({ error: 'Cart not found' });
		}

		return res.status(200).json(userCart); // Return the user's cart
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: `Error retrieving cart: ${error.message}` });
	}
}

export async function deleteCartItem(req, res) {
	try {
		const cartItemId = req.params.cartItem; // Destructure userId and itemId from parameters

		const userCart = await Cart.findOneAndUpdate(
			{ 'products._id': cartItemId },
			{ $pull: { products: { _id: cartItemId } } },
			{ new: true }
		);

		if (!userCart) {
			return res.status(404).json({ error: 'Cart not found' });
		}

		return res.status(200).json(userCart); // Return the updated user's cart
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: `Error deleting cartItem: ${error.message}` });
	}
}
