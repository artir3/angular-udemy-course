export interface AuthResponseData {
    refreshToken?: string,
    expiresIn?: string,
    localId: string,
    email: string,
    idToken: string,
    registered?: boolean,
    kind?: string,
    displayName?: string
}