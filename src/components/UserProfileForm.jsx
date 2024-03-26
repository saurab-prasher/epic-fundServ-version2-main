import React, { useState } from "react";

function UserProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    province: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    email: "",
    phone: "",
  });

  // Canadian provinces
  const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ];

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form validation and submission logic here
    console.log("Form Data Submitted:", formData);
  };

  // Update state on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='form-container'>
      <form
        className='flex flex-col content-between  gap-6  mb-4'
        onSubmit={handleSubmit}
      >
        <div className='form-group flex flex-col gap-2'>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'
          />
        </div>
        <div className='form-group flex flex-col gap-2'>
          <label>Province:</label>
          <select
            name='province'
            value={formData.province}
            onChange={handleChange}
            required
            className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'
          >
            <option value=''>Select a province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group flex flex-col gap-2'>
          <label>City:</label>
          <input
            type='text'
            name='city'
            value={formData.city}
            onChange={handleChange}
            required
            className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'
          />
        </div>
        <div className='form-group flex flex-col gap-2'>
          <label>Address line 1:</label>
          <input
            type='text'
            name='addressLine1'
            value={formData.addressLine1}
            onChange={handleChange}
            required
            className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'
          />
        </div>
        <div className='form-group flex flex-col gap-2'>
          <label>Address line 2:</label>
          <input
            type='text'
            name='addressLine2'
            value={formData.addressLine2}
            onChange={handleChange}
            className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'
          />
        </div>
        <div className='form-group flex flex-col gap-2'>
          <label>Postal code:</label>
          <input
            type='text'
            name='postalCode'
            value={formData.postalCode}
            onChange={handleChange}
            required
            className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'
          />
        </div>
        <div className='form-group flex flex-col gap-2'>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'
          />
        </div>
        <div className='form-group flex flex-col gap-2'>
          <label>Phone:</label>
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'
          />
        </div>
        <div className='form-actions flex gap-6'>
          <button
            className='px-6 py-2 flex items-center  border leading-normal bg-[#2b6777] text-white'
            type='submit'
          >
            Save
          </button>
          <button
            className='px-6 py-2 flex items-center  border leading-normal bg-[#2b6777] text-white'
            type='button'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfileForm;
