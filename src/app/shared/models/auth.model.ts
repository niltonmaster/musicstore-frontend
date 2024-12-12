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


//MODEL PARA MODAL RESET-PASSWORD
export interface ResetPasswordRequestBody {
    newPassword: string;
    token: string;
    email: string;
    confirmNewPassword: string;

}
//importante para tener el formato de response de este metodo. se prueba en postamb en caso OK y ERROR
export interface ResetPasswordApiResponse {
    success: boolean;
    errorMessage: string;

}