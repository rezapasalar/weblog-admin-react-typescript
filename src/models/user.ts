export default interface User {
    id: number,
    is_admin: number,
    name: string,
    family: string,
    day: number,
    month: number,
    year: number,
    code: string,
    mobile: string,
    email: string,
}

export interface UserFlex {
    is_admin: number,
    name: string,
    family: string,
    day?: number | string,
    month?: number | string,
    year?: number | string,
    code?: string,
    mobile?: string,
    email: string,
    password?: string,
    passwordConfirmation?: string
}