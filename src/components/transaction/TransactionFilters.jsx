import { useState } from "react";

const TransactionFilters = ({
  fromDate,
  toDate,
  setToDate,
  setFromDate,
  formatYYYYMMDD,
  handleDateChange,
}) => {
  const [fundGroup, setFundGroup] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  // You can replace these sample options with actual data from your application
  const fundGroups = ["All Groups", "Group 1", "Group 2"];
  const funds = ["All Funds", "Fund A", "Fund B"];

  return (
    <div className='TransactionFilters '>
      <h2 className='text-2xl font-semibold leading-tight'>Filters</h2>

      <div className=' flex  gap-12'>
        <div className=' flex gap-16'>
          <div className='flex flex-col gap-4'>
            <div className='flex  gap-4 justify-between items-center'>
              <label htmlFor='from-date' className=' text-gray-700'>
                From Date (YYYYMMDD):
              </label>
              <input
                type='date'
                id='from-date'
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-md shadow-sm '
              />
            </div>
            <div className='flex  gap-4 justify-between items-center'>
              <label htmlFor='to-date' className='mb-2 text-gray-700'>
                To Date (YYYYMMDD):
              </label>
              <input
                type='date'
                id='datePicker'
                value={toDate}
                onChange={handleDateChange}
                pattern='\d{4}-\d{2}-\d{2}'
                className='px-3 py-2 border border-gray-300 rounded-md shadow-sm '
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col w-80 gap-4 '>
          <div className='flex  gap-4 justify-between items-center'>
            <label htmlFor='fund-group' className=' block w-full text-gray-700'>
              Select Fund Group:
            </label>
            <select
              id='fund-group'
              value={fundGroup}
              onChange={(e) => setFundGroup(e.target.value)}
              className='block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
            >
              {fundGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div className='flex  gap-4 justify-between items-center'>
            <label
              htmlFor='select-fund'
              className=' block w-full text-gray-700 '
            >
              Select Fund:
            </label>
            <select
              id='select-fund'
              value={selectedFund}
              onChange={(e) => setSelectedFund(e.target.value)}
              className='block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
            >
              {funds.map((fund) => (
                <option key={fund} value={fund}>
                  {fund}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
