import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://elearning-demo-strapi-production.up.railway.app';

export const strapiLogin = async (identifier: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/local`, {
            identifier,
            password,
        });

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const strapiRegister = async (username: string, email: string, password: string, role: number = 3) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/local/register`, {
            username,
            email,
            password,
            role,
        });

        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const fetchUserProfile = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/users/me?populate=role`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Fetch user error:', error);
        throw error;
    }
};