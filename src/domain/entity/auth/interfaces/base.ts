export interface ITokens {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}
export interface ISigninOutput extends ITokens {}

export interface IRefreshOutput extends ITokens {}
