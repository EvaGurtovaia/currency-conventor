import React, { useState, useEffect } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
    const [rates, setRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState("RUB");
    const [toCurrency, setToCurrency] = useState("USD");
    const [toValue, setToValue] = useState(0);
    const [fromValue, setFromValue] = useState(0);

    const myHeaders = new Headers();
    myHeaders.append("apikey", "ViVmIveXTxsh0IXkTljsUgEY5bm7ea05");

    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
    };
    useEffect(() => {
        fetch(
            "https://api.apilayer.com/fixer/latest?symbols=RUB%2CEUR%2CGBP%2CUSD&base=USD",
            requestOptions
        )
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setRates(json.rates);
                console.log(json.rates);
            })
            .catch((err) => {
                console.warn(err);
                alert("Was not able to get data");
            });
    }, []);

    const onChangeFromValue = (value) => {
        const price = value / rates[fromCurrency];
        const result = price * rates[toCurrency];
        setToValue(result);
        setFromValue(value);
    };
    const onChangeToValue = (value) => {
        const result = (rates[fromCurrency] / rates[toCurrency]) * value;
        setFromValue(result);
        setToValue(value);
    };
    useEffect(() => {
        onChangeFromValue(fromValue);
    }, [fromCurrency, fromValue, onChangeFromValue]);

    return (
        <div className="App">
            <Block
                value={fromValue}
                currency={fromCurrency}
                onChangeCurrency={setFromCurrency}
                onChangeValue={onChangeFromValue}
            />
            <Block
                value={toValue}
                currency={toCurrency}
                onChangeCurrency={setToCurrency}
                onChangeValue={onChangeToValue}
            />
        </div>
    );
}

export default App;
