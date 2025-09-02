"use client";

import { useRef } from "react";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Advocate } from "../types/advocate.types";

export default function Home() {
  const searchTermRef = useRef<HTMLSpanElement>(null);
  const {
    searchTerm,
    data: advocates,
    pagination,
    loading,
    error,
    handleSearchChange,
    resetSearch
  } = useDebouncedSearch(300);

  // Helper function to format phone number to US format
  const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove any non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    if (cleanNumber.length === 10) {
      return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6)}`;
    }
    return phoneNumber; // Return as-is if not 10 digits
  };

  // Helper function to handle phone number click
  const handlePhoneClick = (phoneNumber: string) => {
    // Remove any non-digit characters for tel: link
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    window.location.href = `tel:${cleanNumber}`;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearchChange(value);

    if (searchTermRef.current) {
      searchTermRef.current.innerHTML = value;
    }
  };

  const onClick = () => {
    resetSearch();
    if (searchTermRef.current) {
      searchTermRef.current.innerHTML = '';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-green-800 text-white py-2 px-4 text-center text-sm" />

      {/* Search Section */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">
            Find Your Healthcare Advocate
          </h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Advocates
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Search by name, city, specialty, or experience..."
                value={searchTerm}
                onChange={onChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
              <button
                onClick={onClick}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
              >
                Reset Search
              </button>
            </div>
            
            {searchTerm && (
              <div className="mt-4 text-sm text-gray-600">
                Searching for: <span className="font-medium text-green-700" ref={searchTermRef}></span>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {error && (
              <div className="px-6 py-4 text-center text-red-600 bg-red-50">
                <p>Error: {error}</p>
              </div>
            )}
            
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Results Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/6">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/6">City</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/12">Degree</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/3">Specialties</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/12">Experience</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {advocates.map((advocate: Advocate) => (
                        <tr key={advocate.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 align-top w-1/6">
                            <div className="font-medium text-gray-900">
                              {advocate.firstName} {advocate.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700 align-top w-1/6">{advocate.city}</td>
                          <td className="px-6 py-4 text-gray-700 align-top w-1/12">{advocate.degree}</td>
                          <td className="px-6 py-4 align-top w-1/3">
                            <div className="flex flex-wrap gap-1">
                              {advocate.specialties.map((specialty, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700 align-top w-1/12">
                            {advocate.yearsOfExperience} years
                          </td>
                          <td className="px-6 py-4 align-top w-1/4">
                            <button 
                              onClick={() => handlePhoneClick(advocate.phoneNumber)}
                              className="text-green-700 hover:text-green-800 font-medium hover:underline transition-colors"
                              title="Click to call"
                            >
                              {formatPhoneNumber(advocate.phoneNumber)}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {advocates.length === 0 && !loading && (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <p>No advocates found matching your search criteria.</p>
                  </div>
                )}

                {/* Pagination Info */}
                {pagination && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>
                        Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                      </span>
                      <span>
                        Page {pagination.page} of {pagination.totalPages}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
