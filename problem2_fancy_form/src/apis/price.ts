import { Currency } from "../types/currency.type"
import rest from "./rest"

export const getListCurrency = async () => {
    const list = await rest.get<Array<Currency>>('prices.json');

    return list;
}
