const express = require('express');
const router = express.Router();

import {addARole, deleteARole, getAllRoles}  from '../models/Role';


router.get('/', getAllRoles);
router.post('/', addARole);
router.delete('/:rid', deleteARole);


export default router;