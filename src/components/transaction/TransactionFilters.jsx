import { useContext, useEffect, useState } from "react";
import { FundContext } from "../../contexts/FundContext";

const TransactionFilters = ({
  fromDate,
  toDate,
  setToDate,
  setFromDate,
  formatYYYYMMDD,
  handleDateChange,
}) => {
  // You can replace these sample options with actual data from your application

  const {
    fundGroups,
    handleSelectedFundGroup,
    selectedFundGroup,
    AllFundsData,
    handleSettingFunds,
    funds,
  } = useContext(FundContext);

  useEffect(() => {
    if (selectedFundGroup) {
      const relatedFunds = AllFundsData.filter(
        (fund) => fund.Fund_group_id === selectedFundGroup
      ).map((fund) => {
        return {
          id: fund.Fund_id,
          name: fund.Fund_name,
        };
      });
      handleSettingFunds(relatedFunds);
    } else {
      handleSettingFunds([]);
    }
  }, [selectedFundGroup]);

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
        <div className='flex flex-col w-[30rem] gap-4 '>
          <div className='flex  gap-4 justify-between items-center'>
            <label htmlFor='fund-group' className=' block w-60 text-gray-700'>
              Select Fund Group:
            </label>
            <select
              id='fund-group'
              value={selectedFundGroup}
              onChange={(e) => handleSelectedFundGroup(e)}
              className='block w-fit px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
            >
              {fundGroups.map((group) => (
                <option key={group.id} value={group.name}>
                  {group.name}
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
              className='block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
              disabled={!selectedFundGroup}
            >
              <option value=''>Select Fund</option>
              {funds.map((fund) => (
                <option key={fund.id} value={fund.id}>
                  {fund.name}
                </option>
              ))}
            </select>
            {/* <select
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
            </select> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
