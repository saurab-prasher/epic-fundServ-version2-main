import { useState, useEffect, useContext } from "react";
import { FundContext } from "../../contexts/FundContext";
import Pagination from "../Pagination";

const AccountFundsTable = () => {
  const {
    filteredData,
    dealerAccountId,
    fetchAllData,
    fundAccountId,
    loadDataIntoFundsTable,
    handleSelectedFundAccTable,
    setSelectedFundId,
    selectedFundId,
    createCompositeKey,
  } = useContext(FundContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    loadDataIntoFundsTable();
  }, [fundAccountId, dealerAccountId]);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    console.log(isChecked); // Debugging: Ensure this logs true/false as expected

    setSelectAllChecked(isChecked); // Reflect the "Select All" checkbox state

    setSelectedFundId((prevSelectedFundId) => {
      const newSelected = {};
      if (isChecked) {
        filteredData.forEach((item) => {
          const compositeKey = createCompositeKey(item); // Ensure this function generates the expected key
          newSelected[compositeKey] = true; // Select all items
        });
      } // When unchecked, newSelected remains an empty object, effectively clearing the selection.
      return newSelected;
    });
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      {/* Account Funds table */}
      <div className='px-4'>
        <h2 className='text-2xl font-semibold leading-tight mb-6'>
          Accounts Funds
        </h2>

        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200  bg-[#2b6777] text-left text-xs font-semibold text-slate-100 uppercase tracking-wider'>
                  <input
                    checked={selectAllChecked}
                    onChange={handleSelectAll}
                    type='checkbox'
                    className='form-checkbox h-4 w-4 text-600 transition duration-150 ease-in-out'
                  />
                </th>

                <th className='px-5 py-3 border-b-2 border-gray-200 bg-[#2b6777] text-left text-xs font-semibold text-slate-100 uppercase tracking-wider'>
                  Fund ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-[#2b6777] text-left text-xs font-semibold text-slate-100 uppercase tracking-wider'>
                  Fund Name
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-[#2b6777] text-left text-xs font-semibold text-slate-100 uppercase tracking-wider'>
                  Class Series
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-[#2b6777] text-left text-xs font-semibold text-slate-100 uppercase tracking-wider'>
                  Units
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData &&
                currentData?.map((item, i) => {
                  const { Fund_id, Fund_name, Fund_class, Unit_balance } = item;
                  const compositeKey = createCompositeKey(item);

                  return (
                    <tr key={i}>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <input
                          type='checkbox'
                          checked={!!selectedFundId[compositeKey]}
                          className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
                          onChange={(e) => handleSelectedFundAccTable(item, e)}
                        />
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <div className='flex items-center'>
                          <div className='ml-3'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {Fund_id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {Fund_name}
                        </p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {Fund_class}
                        </p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {Unit_balance}
                        </p>
                      </td>
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
                className='mt-1 block w-fit border py-1 px-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='20'>20</option>
              </select>
            </div>

            {filteredData.length > 0 && filteredData ? (
              <div className='justify-self-start px-6 mr-auto'>
                <p className='text-xs font-normal text-gray-600 mr-auto'>
                  Total:
                  <span className='font-semibold'>
                    {" "}
                    {filteredData?.length}{" "}
                  </span>
                  accounts
                </p>
              </div>
            ) : (
              ""
            )}

            <Pagination
              rowsPerPage={rowsPerPage}
              totalItems={filteredData?.length}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountFundsTable;
