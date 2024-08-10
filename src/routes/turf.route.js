import { Router } from "express";

import {
    getAllTurfs,
    getTurfById
} from '../controllers/turf.controller.js'

const router = Router();

router.route('/').get(getAllTurfs);
router.route('/get-turf-by-id/:id').get(getTurfById);


export default router;