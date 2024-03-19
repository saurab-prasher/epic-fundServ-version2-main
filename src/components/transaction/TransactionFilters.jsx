import { useContext, useEffect } from "react";
import { FundContext } from "../../contexts/FundContext";

const TransactionFilters = ({
  fromDate,
  toDate,
  setFromDate,
  handleDateChange,
}) => {
  const {
    fundGroups,
    handleSelectedFundGroup,
    selectedFundGroupID,
    AllFundsData,
    handleSettingFunds,
    funds,
    handleSelectedFundId,
    selectedFundID,
  } = useContext(FundContext);

  useEffect(() => {
    if (selectedFundGroupID) {
      const relatedFunds = AllFundsData.filter(
        (fund) => fund.Fund_group_id === selectedFundGroupID
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
  }, [selectedFundGroupID]);

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
                onChange={handleDateChange}
                className='px-3 py-2 border border-gray-300 rounded-md shadow-sm '
              />
            </div>
            <div className='flex  gap-4 justify-between items-center'>
              <label htmlFor='to-date' className='mb-2 text-gray-700'>
                To Date (YYYYMMDD):
              </label>
              <input
                type='date'
                id='to-date'
                value={toDate}
                onChange={handleDateChange}
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
              value={selectedFundGroupID}
              onChange={(e) => handleSelectedFundGroup(e)}
              className='block w-fit px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
            >
              <option value=''>All Fund Groups</option>
              {fundGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex  gap-4 justify-between items-center'>
            <label
              htmlFor='select-fund'
              className=' block w-[15rem] text-gray-700 '
            >
              Select Fund:
            </label>
            <select
              className='block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
              disabled={!selectedFundGroupID}
              onChange={(e) => handleSelectedFundId(e)}
              value={selectedFundID}
            >
              <option value=''>Select Fund</option>
              {funds.map((fund, index) => (
                <option key={fund.name} value={fund.id}>
                  {fund.name}
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
