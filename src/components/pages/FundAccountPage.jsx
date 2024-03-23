import AccoundFundsTable from "../account/AccoundFundsTable";
import AccountDetails from "../account/AccountDetails";
import AccountLookup from "../account/AccountLookup";
import AccountTransactionsTable from "../account/AccountTransactionsTable";

const FundAccountPage = () => {
  return (
    <>
      <div className='mt-12 px-4 w-11/12 mx-auto'>
        <div>
          <div>
            <div className='flex gap-36'>
              <AccountLookup />
              <AccountDetails />
            </div>
            <AccoundFundsTable />
          </div>
          <AccountTransactionsTable />
        </div>
      </div>
    </>
  );
};

export default FundAccountPage;
