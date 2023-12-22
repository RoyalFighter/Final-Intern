import React, { useState, useEffect } from "react";
import { apiService } from "../services/apiService";
import { Spinner } from "../components/Spinner";
import { Paginator } from "../components/Paginator";
import { RatesTable } from "../components/RatesTable";
import { CurrencyConverter } from "../components/CurrencyConverter";
import DateRangePicker from "../components/DateRangePicker";

const ForexApp = () => {
  const perPage = 1;
  const [isLoading, setIsLoading] = useState(false);
  const [information, setInformation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    async function getRates() {
      try {
        setIsLoading(true);
        const response = await apiService.get(
          `/rates?per_page=${perPage}&page=${currentPage}&from=${fromDate.toISOString().split('T')[0]}&to=${toDate.toISOString().split('T')[0]}`,
          {
            per_page: perPage,
            page: currentPage,
            from: fromDate.toISOString().split('T')[0],
            to: toDate.toISOString().split('T')[0],
          },
        );
        setIsLoading(false);
        setInformation(response.data.data.payload);
        setTotalPages(response.data.pagination.pages);
        setError(null);
      } catch (error) {
        console.log("ERROR: ", error);
        setError("Error fetching information.");
      }
    }
    getRates();
  }, [currentPage, fromDate, toDate]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="p-16 text-center font-semibold text-4xl">
          FOREX Playground (NRB)
        </h1>
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            {information && <CurrencyConverter rates={information[0].rates} />}
            <DateRangePicker
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
            />
            <RatesTable information={information} />
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ForexApp;
