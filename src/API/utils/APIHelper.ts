
/** from JSON TO URL-encoded string */
export const EncodeData = <T>(data: T, prefix: string = 'data='): string => {
    const jsonString = JSON.stringify(data);
    const encodedString = encodeURI(jsonString);
    const finalString = prefix + encodedString;
    return finalString;
}

/** from URL-encoded string to JSON */
export const DecodeData = (data: string): string => {
    const decodedData = decodeURI(data);
    const jsonData = JSON.parse(decodedData);
    return jsonData;
}