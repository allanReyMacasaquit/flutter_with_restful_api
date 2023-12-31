import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
export async function getUser(req, res) {
	try {
		const userId = req.params.id; // Assuming the user ID is passed as a parameter in the route

		// Find the user by ID in the database
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Respond with the user details (excluding the password)
		res.status(200).json({ user: sanitizeUserDetails(user) });
	} catch (error) {
		res.status(500).json({ error: `Error fetching user: ${error.message}` });
	}
}

// Helper function to sanitize user details (remove sensitive information)
const sanitizeUserDetails = (user) => {
	const userWithoutPassword = { ...user.toObject() };
	delete userWithoutPassword.password;
	return userWithoutPassword;
};

export async function deleteUser(req, res) {
	try {
		const userId = req.params.id; // Assuming the user ID is passed as a parameter in the route

		// Find the user by ID and delete from the database
		const deletedUser = await User.findByIdAndDelete(userId);

		if (!deletedUser) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Respond with a success message and details of the deleted user
		res.status(200).json({
			message: 'User deleted successfully',
		});
	} catch (error) {
		res.status(500).json({ error: `Error deleting user: ${error.message}` });
	}
}

// Function to update user details
export async function updateUser(req, res) {
	try {
		const userId = req.params.id;
		const {
			username,
			email,
			location,
			password, // You might want to add more fields here based on your schema
		} = req.body;

		// Hash the new password before updating (if provided)
		let hashedPassword;
		if (password) {
			const salt = await bcryptjs.genSalt(10);
			hashedPassword = await bcryptjs.hash(password, salt);
		}

		// Find the user by ID
		const userToUpdate = await User.findById(userId);

		if (!userToUpdate) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Update user details
		userToUpdate.username = username || userToUpdate.username;
		userToUpdate.email = email || userToUpdate.email;
		userToUpdate.location = location || userToUpdate.location;
		if (hashedPassword) {
			userToUpdate.password = hashedPassword;
		}

		// Save updated user details to the database
		const updatedUser = await userToUpdate.save();

		return res.status(200).json({
			message: 'Updated Successfully',
			user: sanitizeUserDetails(updatedUser),
		}); // Return the updated user
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: `Error updating the user: ${error.message}` });
	}
}
