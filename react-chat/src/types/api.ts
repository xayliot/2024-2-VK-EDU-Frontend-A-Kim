export interface Message {
    id: string;
    text: string;
    voice?: string | null;
    files?: File[] | null;
    chat: string;
}

export interface Chat {
    id: string;
    name: string;
    messages: Message[];
}

export interface User {
    id: string;
    username: string;
    email: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}