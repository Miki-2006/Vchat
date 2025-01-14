const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('Authorization'?.split(' ')[1]);
    if (!token) return res.status(401).json({error: 'Нет токена, доступ запрещен'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({error: 'Токен недействителен'});
    }
}

module.exports = auth