export type ErrorCodesToMessageKey = {
    [500]: 'internalServerError';
    [1000]: 'registerPasswordsDontMatch';
    [1001]: 'registerUserAlreadyExists';
    [1002]: 'loginUserNotFound';
    [1003]: 'loginWrongPassword';
    [1004]: 'fieldsNotFilled'
}

export const errorCodeToMessageMap: {[P in keyof ErrorCodesToMessageKey]: ErrorCodesToMessageKey[P]} = {
    500: 'internalServerError',
    1000: 'registerPasswordsDontMatch',
    1001: 'registerUserAlreadyExists',
    1002: 'loginUserNotFound',
    1003: 'loginWrongPassword',
    1004: 'fieldsNotFilled',
};
