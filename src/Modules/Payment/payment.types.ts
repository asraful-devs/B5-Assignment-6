export type PaymentStatus =
    | 'PAID'
    | 'UNPAID'
    | 'CANCELLED'
    | 'FAILED'
    | 'REFUNDED';

export type RideStatus = 'PENDING' | 'PICKED' | 'COMPLETED' | 'CANCELLED';

export interface IPayment {
    _id?: string;
    ride: string;
    transactionId: string;
    amount: number;
    status: PaymentStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IRide {
    _id: string;
    pickupLocation: string;
    dropLocation: string;
    payment: number;
    status: RideStatus;
    paymentStatus?: PaymentStatus;
    createdAt: string;
}
