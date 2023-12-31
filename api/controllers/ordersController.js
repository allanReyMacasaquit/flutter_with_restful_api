import Order from '../models/Orders.js';

export async function getUserOrders(req, res) {
	const userId = req.user.id;
	try {
		const userOrder = await Order.find({ userId })
			.populate({
				path: 'productId',
				select: '-sizes -oldPrice -description -category',
			})
			.exec();
		res.status(200).json(userOrder);
	} catch (error) {
		return res.status(500).json({ message: 'Orders not Found' });
	}
}
