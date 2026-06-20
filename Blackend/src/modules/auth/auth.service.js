const authRepo = require('./auth.repo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (data) => {
    const user = await authRepo.findByUsername(data.username);
    if (!user){
        throw new Error('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(data.password, user.Password_hash);

    if(!isMatch){
        throw new Error('Invalid username or password');
    }

    const token = jwt.sign(
        {
            user_id: user.User_id,
            role: user.Role,
            username: user.Username
            
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    );
    return{
        message: 'Login success',
        token,
        user: {
            role: user.Role,
            username: user.Username
        }
    };
};

// const register = async (data) => {
//     const exist = await authRepo.findByUsername(data.username);

//     if (exist){
//         throw new Error('Username already exists');
//     }

//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     const userId = await authRepo.createUser({
//         username: data.username,
//         password_hash: hashedPassword,
//         role: data.role,  
//         full_name: data.full_name
//     });

//         return {
//             message: 'User registered successfully',
//             userId
//         }
// };

const me = async (userId) => {

    const user = await authRepo.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    return {
        username: user.Username,
        role: user.Role,
        full_name: user.Full_name
    };
};
module.exports = { login, me };