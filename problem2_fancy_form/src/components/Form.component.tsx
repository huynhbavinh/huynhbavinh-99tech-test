import { Autocomplete, Box, Button, TextField } from "@mui/material";
import {
    getListCurrency
} from '../apis/price'
import { useEffect, useState } from "react";
import { Currency } from "../types/currency.type";
import { removeDuplicateValue } from "../utils";
import './From.component.css'
import { NumericFormat } from 'react-number-format';
import InputAdornment from '@mui/material/InputAdornment'

function CustomTextField(errFromValue: boolean) {
    return (
        <TextField sx={{ display: 'inline-block' }} id="value-to" label="Value" variant="filled"
            error={errFromValue}
            helperText={errFromValue ? 'Invalid Input Number' : ''}
        />
    )
}

export default function FormComponent() {
    const [listCurrency, setListCurrency] = useState<Array<Currency>>([]);
    const [toCurrency, setToCurrency] = useState<Currency | null>(null);
    const [fromValue, setFromValue] = useState<number>(0);

    const [errFromValue, setErrFromValue] = useState<boolean>(false);

    useEffect(() => {
        const getListCurrencyFunc = async () => {
            const result = await getListCurrency();
            const data = removeDuplicateValue(result.data, 'currency') // Remove the duplicate currency in sample data
            setListCurrency(data as Array<Currency>);
        }
        getListCurrencyFunc();
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!fromValue) {
            setErrFromValue(true)
            return;
        }
    }

    return (
        <form onSubmit={(e) => { handleSubmit(e) }}>
            <Box sx={{ textAlign: 'center' }}>
                <Box component={'h1'}>Form Currency Swap</Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box className='input-control'>
                    <Box component={'h4'} paddingBottom={'1rem'}>Form Currency:</Box>
                    <NumericFormat
                        label="Currency from"
                        value={fromValue}
                        customInput={TextField}
                        variant="filled"
                        error={errFromValue}
                        helperText={errFromValue ? 'Invalid number' : ''}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        allowNegative={false}
                        thousandSeparator
                        placeholder="0"
                        onValueChange={({ value }) => {
                            setFromValue(Number(value));
                            setErrFromValue(false);
                        }}
                    />
                    <TextField sx={{ display: 'inline-block', width: '10rem' }} className="disableText" label="Value" variant="outlined"
                        value={'USD'}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <Box className='input-control'>
                    <Box component={'h4'} paddingBottom={'1rem'}>To Currency:</Box>
                    <Autocomplete
                        sx={{ display: 'inline-block', width: '24rem' }}
                        id={'toCurrencyInput'}
                        disablePortal
                        options={listCurrency}
                        getOptionLabel={(option: Currency) => option.currency}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    srcSet={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${option.currency}.svg`}
                                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${option.currency}.svg`}
                                    alt="Icon"
                                />
                                {option.currency} - Price: {option.price}
                            </Box>
                        )}
                        renderInput={(params) => <TextField
                            {...params}
                            label={'Currency To'}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />}
                        onChange={(_, value) => setToCurrency(value)}
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ width: '10rem' }} type="submit" variant="outlined">Submit</Button>
            </Box>
        </form>
    )
}
