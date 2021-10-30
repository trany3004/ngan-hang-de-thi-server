const token = require('./token');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const data = await token.getToken(username, password);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const verify = async (req, res, next) => {
    try {
        const user = await token.verify(req.headers);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
module.exports = { verify, login };
