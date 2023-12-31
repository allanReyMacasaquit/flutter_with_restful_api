// Import necessary dependencies and functions
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function verifyToken(req, res, next) {
	const token =
		req.headers.authorization?.split(' ')[1] || req.cookies.jwtToken;

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized: No token provided' });
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
		if (err) {
			return res.status(403).json({ error: 'Unauthorized: Invalid token' });
		} else {
			try {
				const user = await User.findById(decodedToken.userId);
				if (!user) {
					return res.status(404).json({ error: 'User not found' });
				}

				req.user = user;
				next(); // Proceed to the next middleware or route handler
			} catch (error) {
				return next(errorHandler(500, 'Invalid Token'));
			}
		}
	});
}
