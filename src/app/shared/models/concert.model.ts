import { appConfig } from '../../app.config';
export interface Concert {
    id: number;
    title: string;
    description: string;
    extendedDescription: string;
    place: string;
    unitPrice: number;
    genre: string;
    genreId: number;
    dateEvent: string;
    timeEvent: string;
    imageUrl: string;
    ticketsQuantity: number;
    finalized: boolean;
    status: string;

}

//para respuesta de concierto por ID
export interface GetConcertByIdApiResponse {

    data: Concert;
    success: boolean;
    errorMessage: string;
}


export interface BuyTicketApiResponse {
    data: number,
    success: boolean,
    errorMessage: string
}


export interface CreateEventApiResponse {
    data: number;
    success: boolean;
    errorMessage: string;
}