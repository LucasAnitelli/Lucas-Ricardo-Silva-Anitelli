export interface ListExpensesDTO {
    _id?: string;
    date: string;
    item: string;
    value: number;
    additionalInfo?: {};
    error?: string;
}

export interface ResponseDTO {
    error: string;
    message: string;
    statusCode: number;
}