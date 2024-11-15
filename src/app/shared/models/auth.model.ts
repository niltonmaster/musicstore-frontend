export interface LoginApiResponse {
    data: {
        token: string;
        expirationToken: string
    }
    // | null;//IMPORTANTE esto es la sintaxis para indicar que puede ser NULL
    success: string;
    errorMessage: string
    // | null;

}