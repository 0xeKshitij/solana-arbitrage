"use client"

import React from "react";
import { useState, useEffect } from "react";
import getData from "./data";

const Home = () => {
  const [trades, setTrades] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTrades = async () => {
      const data = await getData();
      setTrades(data);
    };
    fetchTrades();
  }, []);

  const handleNextPage = () => {
    if (currentPage < Math.floor(trades.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleExecute = () => {};

  const currentTrades = trades.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Arbitrage Opportunities for WSOL/USDT</h1>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Sr. No.</th>
                <th className="py-2 px-4 border-b">Timestamp</th>
                <th className="py-2 px-4 border-b">DEX Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">DEX Address</th>
              </tr>
            </thead>
            <tbody>
              {currentTrades.map((trade, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{index+1+currentPage*itemsPerPage}</td>
                  <td className="py-2 px-4 border-b">{trade.Block.Time}</td>
                  <td className="py-2 px-4 border-b">{trade.Trade.Dex.ProtocolFamily}</td>
                  <td className="py-2 px-4 border-b">{trade.Trade.Buy.PriceInUSD}</td>
                  <td className="py-2 px-4 border-b">{trade.Trade.Dex.ProgramAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between w-full">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= Math.floor(trades.length / itemsPerPage)}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage >= Math.floor(trades.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleExecute}> Execute </button>
    </div>
  );
};

export default Home;
