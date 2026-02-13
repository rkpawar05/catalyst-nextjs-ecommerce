// Authentication-related TypeScript interfaces

export interface LoginCredentials {
    username: string;
    password: string;
    expiresInMins?: number;
}

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}
