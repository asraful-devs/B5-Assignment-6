import axios from 'axios';
import { useCallback, useState } from 'react';

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export const useSendContactEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = useCallback(async (data: ContactFormData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/contact/send-email', {
                to: data.email,
                name: data.name,
                subject: `Contact Form: ${data.subject}`,
                message: data.message,
                phone: data.phone,
            });

            return response.data;
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'Failed to send email';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { mutate, loading, error };
};
