import { Router } from 'express';

import {
    createBooking,
    getUserBookings_expired,
    getUserBookings_future,
    getTurfBookings,
    cancelBooking,
    getBookedTimeSlot
} from "../controllers/booking.controller.js";
import { ownerTokenVerification } from '../middlewares/ownerTokenVerification.middleware.js';
import { userTokenVerification } from "../middlewares/userTokenVerification.middleware.js"

const router = Router();

//router for Creating Booking

router.post('/create-booking' ,createBooking);

//router for getting bookings for a specific turf

router.get('/turf/:turf_id', getTurfBookings);

//router for getting bookings for a specific user

router.get('/user/:user_id/expired',userTokenVerification, getUserBookings_expired);




router.get('/user/:user_id/future',userTokenVerification, getUserBookings_future);

// router for getting booked timeslots for a given date and a turf
router.get('/turf/:turf_id/booked-time-slots',userTokenVerification, getBookedTimeSlot);

//router for cancelling bookings

router.patch('/cancel/:booking_id', cancelBooking); //patch is used because we only have to update the status field to mark it as cancelled

export default router;