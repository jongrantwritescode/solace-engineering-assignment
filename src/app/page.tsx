"use client";

import { useEffect, useState, useRef } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const searchTermRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    if (searchTermRef.current) {
      searchTermRef.current.innerHTML = searchTerm;
    }

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
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
            
            {searchTermRef.current?.innerHTML && (
              <div className="mt-4 text-sm text-gray-600">
                Searching for: <span className="font-medium text-green-700" ref={searchTermRef}></span>
              </div>
            )}
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Degree</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Specialties</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Experience</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAdvocates.map((advocate, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 align-top">
                        <div className="font-medium text-gray-900">
                          {advocate.firstName} {advocate.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 align-top">{advocate.city}</td>
                      <td className="px-6 py-4 text-gray-700 align-top">{advocate.degree}</td>
                      <td className="px-6 py-4 align-top">
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
                      <td className="px-6 py-4 text-gray-700 align-top">
                        {advocate.yearsOfExperience} years
                      </td>
                      <td className="px-6 py-4 align-top">
                        <button className="text-green-700 hover:text-green-800 font-medium">
                          {advocate.phoneNumber}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredAdvocates.length === 0 && (
              <div className="px-6 py-12 text-center text-gray-500">
                <p>No advocates found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
