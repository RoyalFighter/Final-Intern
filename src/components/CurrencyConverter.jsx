import React, { useState, useEffect } from "react";

export const CurrencyConverter = ({ rates }) => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const fromRate = rates.find(
        (rate) => rate.currency.iso3 === toCurrency
      )?.buy;

      const toRate = rates.find(
        (rate) => rate.currency.iso3 === fromCurrency
      )?.sell;

      if (fromRate && toRate) {
        const result = (amount / fromRate) * toRate;
        setConvertedAmount(result.toFixed(2));
      }
    }
  }, [fromCurrency, toCurrency, amount, rates]);

  return (
    <>
      <div className="m-8">
        <div className="space-y-4">
          <h2 className="text-2xl flex font-semibold justify-center">Currency Converter</h2>
          <div className="flex items-center space-x-4  justify-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />

            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="h-full rounded-md py-2 pr-7 border-0 ring-1 ring-inset ring-gray-300 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            >
              {rates.map((rate, index) => (
                <option key={index} value={rate.currency.iso3}>
                  {rate.currency.iso3}
                </option>
              ))}
            </select>

            <span className="text-2xl">&#8594;</span>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="h-full rounded-md border-0 ring-1 ring-inset ring-gray-300 py-2 pr-7 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            >
              {rates.map((rate, index) => (
                <option key={index} value={rate.currency.iso3}>
                  {rate.currency.iso3}
                </option>
              ))}
            </select>

            <p className="text-lg font-semibold">= {convertedAmount}</p>
          </div>
        </div>
      </div>
    </>
  );
};
