export function translate(text: string, variables: any): string {
    let translatedText = text;

    Object.keys(variables).forEach((key: string) => {
        translatedText = translatedText.replace(`{{${key}}}`, variables[key]);
    });

    return translatedText;
}