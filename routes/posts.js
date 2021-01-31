import Router from 'express';
import { verifyUser } from './verifyUser.js';

const postRouter = Router();


postRouter.get('/', verifyUser, (req, res) => {
    res.send(req.user);
});



export default postRouter;