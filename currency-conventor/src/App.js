import React, { useState, useEffect } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
    const [rates, setRates] = useState({});

    const myHeaders = new Headers();
    myHeaders.append("apikey", "ViVmIveXTxsh0IXkTljsUgEY5bm7ea05");

    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
    };
    useEffect(() => {
        fetch(
            "https://api.apilayer.com/fixer/latest?symbols=RUB%2CEUR%2CGBP&base=USD",
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

    return (
        <div className="App">
            <Block
                value={0}
                currency="RUB"
                onChangeCurrency={(cur) => console.log(cur)}
            />
            <Block value={0} currency="USD" />
        </div>
    );
}

export default App;
