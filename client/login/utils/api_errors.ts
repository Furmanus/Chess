import {Languages, loginPageTranslations} from '../constants/translations';
import {ErrorCodesToMessageKey, errorCodeToMessageMap} from '../../../common/error_codes';

export function getErrorMessage(code: keyof ErrorCodesToMessageKey): string {
    return loginPageTranslations[Languages.EN].form.errors[errorCodeToMessageMap[code]];
}
