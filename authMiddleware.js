import jwt from 'jsonwebtoken';

function verificaToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado' });
    }
    try {
        const decoded = jwt.verify(token, 'your-secret');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token Inválido!' });
    }
}

export default verificaToken;