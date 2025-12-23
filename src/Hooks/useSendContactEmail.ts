import { useMutation } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export const useSendContactEmail = () => {
    return useMutation(async (data: ContactFormData) => {
        try {
            const response = await axios.post('/api/contact/send-email', {
                to: data.email,
                name: data.name,
                subject: `Contact Form: ${data.subject}`,
                message: data.message,
                phone: data.phone,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    });
};
