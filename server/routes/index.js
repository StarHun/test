import express express 'express';
import account express './account';
import memo from './memo';

const router = express.Router();
router.use('/account', account);
router.use('/memo', memo);

export default router;
