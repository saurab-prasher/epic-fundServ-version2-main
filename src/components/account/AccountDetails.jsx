import { useContext, useState } from "react";
import { FundContext } from "../../contexts/FundContext";
import UserProfileForm from "../UserProfileForm";
const AccountDetails = () => {
  const { accountInfo } = useContext(FundContext);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEditForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  return (
    <>
      <div className='container mx-auto flex flex-col'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-semibold leading-tight '>
            Accounts Details
          </h2>

          {accountInfo.Account_name && (
            <button
              onClick={handleEditForm}
              className='px-6 py-2 flex items-center  border leading-normal bg-[#2b6777] text-white'
            >
              {isFormVisible ? "Cancel" : "Edit"}
            </button>
          )}
        </div>
        <div className='pb-8 mb-4 w-full bg-[#c8d8e4] p-8 px-12 rounded-md'>
          {isFormVisible ? (
            <UserProfileForm />
          ) : (
            <div className='mb-4'>
              <div className='flex flex-col content-between  gap-6  mb-4'>
                <div className='flex flex-col gap-2'>
                  <label>Name</label>
                  <p className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'>
                    {accountInfo?.Account_name || "N/A"}
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <label> Address</label>
                  <p className='text-gray-700 border-b py-3 w-full leading-tight text-sm bg-white px-3'>
                    {[
                      accountInfo?.Account_address,
                      accountInfo?.Account_city,
                      accountInfo?.Account_prov,
                      accountInfo?.Account_postal,
                    ]
                      .filter(Boolean)
                      .join(", ") || "N/A"}
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <label>Email</label>
                  <p className='text-gray-700 border-b py-3 w-full leading-tight text-sm bg-white px-3'>
                    {`${accountInfo?.Account_email || "no email found"} `}
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <label>Phone</label>

                  <p className='text-gray-700 border-b py-3 w-full leading-tight text-sm bg-white px-3'>
                    {accountInfo?.Account_phone
                      ? accountInfo.Account_phone
                      : "no contact info found"}
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <label>Type</label>
                  <p className=' text-gray-700 border-b py-3 w-full  leading-tight text-sm bg-white px-3'>
                    {accountInfo?.Account_type || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
