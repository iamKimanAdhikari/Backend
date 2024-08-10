import { asyncHandler } from "../utils/asyncHandler.js";
import pool from "../db/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const getAllTurfs = asyncHandler( async (req, res) => {
    try {
        const allTurfs = await pool.query("select * from turfs;");
        // console.log(allTurfs.rows)
        return res
        .status(200)
        .json(
            new ApiResponse(200, {...allTurfs.rows}, "successfull")
        )
    } catch (error) {
        res.status(501).json(
            new ApiResponse(501, "Couldnot fetch the data", "Failed")
        )
    }
})

const getTurfById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const requiredTurf = await pool.query("select * from turfs where id = $1;", [id]);
        // console.log(requiredTurf.rows)
        return res
        .status(200)
        .json(
            new ApiResponse(200, {...requiredTurf.rows[0]}, "successfull")
        )
    } catch (error) {
        res.status(501).json(
            new ApiResponse(501, "Turf not found", "Failed")
        )
    }
})


export { getAllTurfs, getTurfById }