const authService = require('./auth.service');
const login = async (req , res) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const register = async (req , res) => {
    try {
        console.log('BODY:', req.body);
        const result = await authService.register(req.body);   
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const me = async (req, res) => {

    try {

        const result = await authService.me(req.user.user_id);

        res.json(result);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};


module.exports = { login, register, me };