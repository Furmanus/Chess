export function translate(text: string, variables: any): string {
    let translatedText = text;

    Object.keys(variables).forEach((key: string) => {
        translatedText = translatedText.replace(`{{${key}}}`, variables[key]);
    });

    return translatedText;
}
export function converNumberToAlphabetLetter(val: number): string {
    if (val > 26) {
        throw new Error('Invalid value to convert');
    }

    return (val + 9).toString(36);
}
