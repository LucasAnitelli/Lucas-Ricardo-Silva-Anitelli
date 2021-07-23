export interface LoginDTO {
    email: string;
}

export interface ResponseUser {
    statusCode: string;
    error: string;
    message: string;
    token: string;
    _id: string;
}

