export interface IResource {
    id: number,
    name: string,
    quantity: number
}
export interface IBookingRequest{
    dateFrom: string,
    dateTo: string,
    requestedQuantity: number,
    resourceId: number
}