import React, { useState, useEffect, useContext } from "react";
import Pagination from "../Pagination";
import { FundContext } from "../../contexts/FundContext";

const NavPage = () => {
  const {
    fetchNavFundData,
    navFundId,
    allNavData: navs,
  } = useContext(FundContext);

  console.log(navs);

  // States to hold the selected fund ID and fund name
  const [selectedFundId, setSelectedFundId] = useState("");
  const [selectedFundName, setSelectedFundName] = useState("");

  useEffect(() => {
    fetchNavFundData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const filteredData = navs.filter(
    (nav) =>
      nav.Fund_id === selectedFundId || nav.Fund_name === selectedFundName
  );

  // Calculate the current items to display
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem); // Changed from navsData to use navFundId from context

  // Event handler for when the fund ID changes
  const handleFundIdChange = (event) => {
    const newId = event.target.value;
    setSelectedFundId(newId);

    const fund = navFundId.find((f) => f.Fund_id === newId);
    if (fund) {
      setSelectedFundName(fund.Fund_name); // Assuming your fund objects have Fund_name property
    }
  };

  // Event handler for when the fund name changes
  const handleFundNameChange = (event) => {
    const newName = event.target.value;
    setSelectedFundName(newName);

    const fund = navFundId.find((f) => f.Fund_name === newName);
    if (fund) {
      setSelectedFundId(fund.Fund_id); // Assuming your fund objects have Fund_id property
    }
  };

  return (
    <div className='my-12 px-4 w-11/12 mx-auto'>
      <h2 className='text-2xl font-semibold leading-tight mb-6'>Funds</h2>
      <div className='mb-8'>
        <div className='mb-4'>
          <label
            htmlFor='fund-id'
            className='block text-sm font-medium text-gray-700'
          >
            Fund ID:
          </label>

          <input
            list='fund-ids'
            id='fund-id'
            value={selectedFundId}
            onChange={handleFundIdChange}
            placeholder='Type or select a fund ID'
            className='block w-[32rem] px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
          />

          <datalist id='fund-ids'>
            {navFundId.map((fund) => {
              const key = fund.Fund_id + "-" + fund.Fund_name;
              return <option key={key} value={fund.Fund_id} />;
            })}
          </datalist>
        </div>
        <div>
          <label
            htmlFor='fund-name'
            className='block text-sm font-medium text-gray-700'
          >
            Fund Name:
          </label>
          <input
            list='fund-names'
            id='fund-name'
            value={selectedFundName}
            onChange={handleFundNameChange}
            placeholder='Type or select a fund name'
            className='block  w-[32rem] px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
          />

          <datalist id='fund-names'>
            {navFundId.map((fund) => {
              const key = fund.Fund_id + "-" + fund.Fund_name;
              return <option key={key} value={fund.Fund_name} />;
            })}
          </datalist>
        </div>
      </div>
      <div>
        <h2 className='text-2xl font-semibold leading-tight mb-6'>NAVS</h2>
        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr className='bg-[#2b6777] text-slate-100'>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  NAV Date
                </th>

                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Type
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Class
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Series
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  NAV
                </th>
                <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                  Currency
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {currentData.length > 0 &&
                currentData.map((nav, index) => (
                  <tr key={index}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {nav.NAV_Date}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {nav.type}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {nav.Fund_class}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {nav.series}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {nav.NAV}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {nav.Currency}
                    </td>
                  </tr>
                ))}
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

            {navs.length > 0 && navs ? (
              <div className='justify-self-start px-6 mr-auto'>
                <p className='text-xs font-normal text-gray-600 mr-auto'>
                  Total:
                  <span className='font-semibold'> {navs?.length} </span>
                  accounts
                </p>
              </div>
            ) : (
              ""
            )}

            <Pagination
              rowsPerPage={rowsPerPage}
              totalItems={navs?.length}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavPage;
