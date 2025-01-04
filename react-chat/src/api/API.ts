import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../types/apiInterfaces';

class API {
    private static BASE_URL = 'https://vkedu-fullstack-div2.ru/api';

    private static async call<T>(url: string, options: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await axios({
                url: `${this.BASE_URL}${url}`,
                ...options,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || 'Ошибка API');
            }
            throw new Error('Неизвестная ошибка');
        }
    }

    public static get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
        return this.call<T>(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            params,
        });
    }

    public static post<T>(url: string, body: unknown): Promise<ApiResponse<T>> {
        return this.call<T>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            data: body,
        });
    }

    public static put<T>(url: string, body: unknown): Promise<ApiResponse<T>> {
        return this.call<T>(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            data: body,
        });
    }

    public static delete<T>(url: string): Promise<ApiResponse<T>> {
        return this.call<T>(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    }
}

export default API;