'use client';

import { useState } from "react";
import { toast } from "react-toastify";
import cancelBooking from "@/app/actions/cancelBooking";
import ConfirmationDialog from "@/assets/js/dialog";

const CancelBookingButton = ( {bookingId} ) => {
    const [open, setOpen] = useState(false); 
    const [confirming, setConfirming] = useState(false);  

    const handleCancelBooking = () => {
        setOpen(true); 
    };

    const handleConfirm = async () => {
        setConfirming(true); 

        try {
            const result = await cancelBooking(bookingId);
            if (result.success) {
                toast.success("Booking canceled successfully");
            } else {
                toast.error("Failed to cancel booking");
            }
        } catch (error) {
            toast.error("Failed to cancel booking");
        } finally {
            setConfirming(false);
            setOpen(false);
        }
    };

    const handleCancel = () => {
        setOpen(false); 
    };

    return (
        <>
            <button
                onClick={handleCancelBooking}
                className="bg-red-500 text-primary px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
            >
                Cancel Booking
            </button>

            <ConfirmationDialog
                title="Cancel Booking"
                content="Are you sure you want to cancel this booking?"
                onConfirm={handleConfirm}  
                onCancel={handleCancel}    
                open={open}    
                setOpen={setOpen}  
            />
        </>
    );
};

export default CancelBookingButton;
