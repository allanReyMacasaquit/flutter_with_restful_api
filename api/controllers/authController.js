import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
	try {
		const { username, email, password, location } = req.body;

		// Validate the email format using regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: 'Invalid email format' });
		}

		// Check if the email already exists in the database
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: 'Email already exists' });
		}

		// Hash the provided password for security
		const hashedPassword = bcryptjs.hashSync(password, 10);

		// Create a new user instance with the provided data
		const newUser = new User({
			username,
			email,
			location,
			password: hashedPassword,
		});

		// Save the new user to the database
		await newUser.save();

		// Respond with a success message and 201 (Created) status
		res.status(201).json('User created successfully!');
	} catch (error) {
		// Pass any errors to the error handler
		res.status(500).json({ error: `Error creating a user: ${error.message}` });
	}
};

export async function loginUser(req, res, next) {
	const { email, password } = req.body;

	try {
		// Check if a user with the provided email exists in the database
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ error: 'User not Found' });
		}

		// Check if the provided password matches the user's password using bcryptjs
		const isMatch = await bcryptjs.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ error: 'Password does not match' });
		}

		// Create a JWT token for authentication
		const token = createTokenSignin(user);

		// Set the token as a cookie in the response
		setTokenCookie(res, token);

		// Send a success response with user data (excluding the password)
		res.status(200).json({
			message: 'Sign-in successful',
			user: sanitizeUserSignin(user),
			token: token,
		});
	} catch (error) {
		res.status(500).json({ error: `Error signing a user: ${error.message}` });
	}
}

// Helper functions
const createTokenSignin = (user) => {
	const tokenPayload = {
		userId: user._id,
		email: user.email,
	};
	return jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
		expiresIn: '1h',
	});
};
const setTokenCookie = (res, token) => {
	res.cookie('jwtToken', token, {
		httpOnly: true,
		secure: true,
		maxAge: 3600000, // 1hr
		// Other cookie options can be set as needed
	});
};

const sanitizeUserSignin = (user) => {
	const userWithoutPassword = { ...user.toObject() };
	delete userWithoutPassword.password;
	return userWithoutPassword;
};
