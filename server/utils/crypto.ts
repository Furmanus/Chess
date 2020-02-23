import * as crypto from 'crypto';

export function encrypt(str: string): string {
    const {
        CRYPTO_SECRET,
    } = process.env;

    return crypto.createHmac('sha256', CRYPTO_SECRET).update(str).digest('hex');
}
export function compareString(encryptedString: string, stringToCompare: string): boolean {
    return encryptedString === encrypt(stringToCompare);
}
