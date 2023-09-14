export const typeValidation = (key: string, value: any) => {
    return (
        Object.prototype.toString.call(value) ===
        `[object ${key.charAt(0).toUpperCase() + key.slice(1)}]`
    );
};
