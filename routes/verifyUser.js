import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({message:"Access Denied."});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({message:"Invalid User."})
    }
}