import React, { useState, useEffect } from "react";

// Dummy data for example purposes
const fundsData = [
  { id: "099", name: "EPIC CANADIAN LONG/SHORT OPPORTUNISTIC FUND LP CLASS G" },
  // Add more fund objects here as needed
];

const navsData = [
  {
    date: "20231231",
    type: "PRI",
    class: "LEAD",
    series: "G",
    nav: "4,274.4112",
    currency: "00",
  },
  // Add more NAV objects here as needed
];

const NavPage = () => {
  // Simulate fund data and NAVs
  const fundInfo = {
    fundId: "(099) EPIC CANADIAN LONG/SHORT OPPORTUNISTIC FUND LP CLASS G",
    fundName: "EPIC CANADIAN LONG/SHORT OPPORTUNISTIC FUND LP CLASS G (099)",
  };

  const navs = [
    {
      date: "20231231",
      type: "PRI",
      class: "LEAD",
      series: "G",
      nav: "4,274.4112",
      currency: "00",
    },
    {
      date: "20231130",
      type: "PRI",
      class: "LEAD",
      series: "G",
      nav: "4,274.4112",
      currency: "00",
    },
    // Add more NAVs as needed
  ];

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-8'>
        <div className='mb-4'>
          <label
            htmlFor='fund-id'
            className='block text-sm font-medium text-gray-700'
          >
            Fund ID:
          </label>
          <select
            className='block w-fit px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
            id='fund-id'
          >
            <option>{fundInfo.fundId}</option>
          </select>
        </div>
        <div>
          <label
            htmlFor='fund-name'
            className='block text-sm font-medium text-gray-700'
          >
            Fund Name:
          </label>
          <select
            className='block w-fit px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '
            id='fund-name'
          >
            <option className='block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm '>
              {fundInfo.fundName}
            </option>
          </select>
        </div>
      </div>
      <div>
        <h3 className='text-lg font-semibold leading-tight'>NAVS</h3>
        <table className='min-w-full divide-y divide-gray-200 mt-4'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                NAV Date
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Type
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Class
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Series
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                NAV
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Currency
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {navs.map((nav, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {nav.date}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {nav.type}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {nav.class}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {nav.series}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {nav.nav}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {nav.currency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NavPage;
