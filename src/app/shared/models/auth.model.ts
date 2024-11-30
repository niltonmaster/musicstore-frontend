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


//no estoy bien pa pero bueno
export interface RegisterRequestBody {
    documentNumber: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    documentType: string;
    age: number;
    confirmPassword: string;
}