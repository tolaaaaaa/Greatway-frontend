type Bookings = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    location: string;
    inspectionDate: Date;
    status: BOOKING_STATUS;
    declineReason?: string;
    inspectionTime: Date;
    message: string;
}

export enum BOOKING_STATUS {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    DECLINED = "declined",
}