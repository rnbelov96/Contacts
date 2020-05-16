export type Contact = {
  name: string,
  phone: string,
  id?: number
}

export type LoginData = {
  email: string,
  password: string
}

export enum ErrorStatus {
  OK,
  WRONG_EMAIL,
  LOADING_FAILED,
  WRONG_LOGIN_DATA,
  WRONG_PHONE
}

export enum AuthorizationStatus {
  AUTH,
  NO_AUTH
}
