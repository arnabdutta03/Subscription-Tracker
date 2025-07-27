import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');

        // We can delete the password by doing this also

        // const resUsers = users.map(user => {
        //     const obj = user.toObject();
        //     delete obj.password;
        //     return obj;
        // })
        
        res.status(200).json({
            success: true,
            // data: resUsers,
            data: users,
        });
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error)
    }
}