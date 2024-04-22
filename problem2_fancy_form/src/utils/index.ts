export const removeDuplicateValue = (arr: Array<any>, key: string) => {
    const res = arr.filter((obj, index) => {
        return index === arr.findIndex(o => obj[key] === o[key]);
    });
    return res;
}