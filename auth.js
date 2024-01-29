const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
const token = req.headers['authorization'];

if (!token) {
    return res && res.writeHead(401, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: 'Token not provided' }));
}

try {
    const decodedToken = jwt.decode(token);
    req.user = decodedToken;

    next();
} catch (error) {
    console.error('Token decoding failed:', error);
    if (res) {
        res.writeHead(403, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: 'Invalid token' }));
    }
}
};

module.exports = authenticateToken