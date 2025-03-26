export type FieldError = {
    error: string
    field: string
}

export type BaseResponse<T = {}> = {
    data: T
    fieldErrors: FieldError[]
    messages: string[]
    resultCode: number
}