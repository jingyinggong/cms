const express = require('express');
const router = express.Router();

import { getAllFuncs, addAFunc, deleteAFunc, updateAFunc}  from '../models/Func';

router.get('/', getAllFuncs);

router.post('/', addAFunc);

router.delete('/:fid', deleteAFunc);

router.put('/:fid', updateAFunc)


export default router;