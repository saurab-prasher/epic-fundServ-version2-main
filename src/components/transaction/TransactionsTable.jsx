import { useState, useEffect, useContext } from "react";
import { FundContext } from "../../contexts/FundContext";
import * as XLSX from "xlsx";
import TransactionFilters from "./TransactionFilters";
import Pagination from "../Pagination";
const TransactionsTable = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const {
    allTransactionsData,
    fetchAllTransactionsData,
    fetchFundGroupData,
    selectedFundGroupID,
    selectedFundID,
    fetchAllFundsData,
  } = useContext(FundContext);

  useEffect(() => {
    fetchAllFundsData();
    fetchFundGroupData();
  }, []);

  useEffect(() => {
    fetchAllTransactionsData();
  }, []);

  useEffect(() => {
    let newFilteredTransactions = [...allTransactionsData];

    // Check if all filters are selected
    if (selectedFundGroupID && selectedFundID && fromDate && toDate) {
      // Filter by Fund ID
      newFilteredTransactions = newFilteredTransactions.filter(
        (transaction) => transaction.Fund_id === selectedFundID
      );

      // Filter by Date Range
      newFilteredTransactions = newFilteredTransactions.filter(
        (transaction) => {
          const tradeDate = new Date(
            transaction.Trade_date.substring(0, 4),
            transaction.Trade_date.substring(4, 6) - 1,
            transaction.Trade_date.substring(6, 8)
          );
          return (
            tradeDate >= new Date(fromDate) && tradeDate <= new Date(toDate)
          );
        }
      );
    } else {
      // If all filters are not selected, set an empty array
      newFilteredTransactions = [];
    }

    setFilteredTransactions(newFilteredTransactions);
  }, [
    allTransactionsData,
    selectedFundID,
    fromDate,
    toDate,
    selectedFundGroupID,
  ]);

  const formatYYYYMMDD = (dateStr) => {
    return `${dateStr.substring(0, 4)}-${dateStr.substring(
      4,
      6
    )}-${dateStr.substring(6, 8)}`;
  };
  const handleDateChange = (e) => {
    const { value, id } = e.target;
    if (id === "from-date") {
      setFromDate(value);
    } else if (id === "to-date") {
      setToDate(value);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentData = filteredTransactions?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions); // Convert
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions"); //
    XLSX.writeFile(workbook, "Transactions.xlsx");
  };

  return (
    <div>
      <div className='my-12 px-4 w-11/12 mx-auto'>
        <TransactionFilters
          handleDateChange={handleDateChange}
          fromDate={fromDate}
          toDate={toDate}
          setToDate={setToDate}
          setFromDate={setFromDate}
          formatYYYYMMDD={formatYYYYMMDD}
        />
        <div className='flex items-center p-2 justify-between my-6 '>
          <h2 className='text-2xl font-semibold leading-tight'>
            Accounts Transactions
          </h2>

          <button
            onClick={downloadExcel}
            className='my-2 bg-[#2b6777] text-white font-bold py-2 px-4 rounded'
          >
            Download Excel
          </button>
        </div>
        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
          <table className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <thead>
              <tr className='bg-[#2b6777] text-slate-100'>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Fund Account ID
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  OTH Fund ID
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Fund ID
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Fund Class
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Rep Code
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Dealer Code
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Transact Type
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Transact Name
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Transact Type Detail
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Record Status
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Trade Date
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Settlement Date
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Gross Amount
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Fees
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Net Amount
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Settlement Amount
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  NAV
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Units
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Process Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData &&
                currentData?.map((transaction, index) => {
                  // const {
                  //   Fund_account_id,
                  //   OTH_Fund_account_id,
                  //   Fund_id,
                  //   Fund_class,
                  //   Rep_code,
                  //   Dealer_code,
                  //   Transact_type,
                  //   transact_name,
                  //   Transact_type_detail,
                  //   Record_status,
                  //   Trade_date,
                  //   Settlement_date,
                  //   Gross_amount,
                  //   Fees,
                  //   Net_amount,
                  //   Settlement_amount,
                  //   NAV,
                  //   Units,
                  //   Process_date,
                  // } = transaction;

                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {Object.values(transaction).map((value, idx) => (
                        <td
                          key={idx}
                          className='px-2 py-3 border-b border-gray-200 text-sm whitespace-nowrap'
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-4'>
              <label
                htmlFor='rows-per-page'
                className='text-xs font-semibold text-gray-600 tracking-wider '
              >
                Rows per page:
              </label>
              <select
                name='rows per page'
                id='rows-per-page'
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
                className=' mt-1 block w-fit border py-1 px-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='20'>20</option>
              </select>
            </div>

            {filteredTransactions.length > 0 && filteredTransactions ? (
              <div className='justify-self-start px-6 mr-auto'>
                <p className='text-xs font-normal text-gray-600 mr-auto'>
                  Total:
                  <span className='font-semibold'>
                    {" "}
                    {filteredTransactions?.length}{" "}
                  </span>
                  transactions
                </p>
              </div>
            ) : (
              ""
            )}

            <Pagination
              rowsPerPage={rowsPerPage}
              totalItems={filteredTransactions?.length}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
