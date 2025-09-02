"use client";

import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { SearchBar, AdvocateResults } from "../components/advocates";
import { Banner } from "../components/ui";
import { cleanPhoneNumber } from "../lib/utils";

export default function Home() {
  const {
    searchTerm,
    data: advocates,
    pagination,
    loading,
    error,
    handleSearchChange,
    resetSearch
  } = useDebouncedSearch(300);
  
  const handlePhoneClick = (phoneNumber: number) => {
    const formattedNumber = phoneNumber.toString();
    window.location.href = `tel:${formattedNumber}`;
  };

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
    const term = searchTerm.toLowerCase();

    if (searchTermRef.current) {
      searchTermRef.current.innerHTML = searchTerm;
    }

    console.log("filtering advocates...");
    const cleanTerm = searchTerm.replace(/[()\-\s]/g, '');
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      const first = advocate.firstName.toLowerCase();
      const last = advocate.lastName.toLowerCase();
      const city = advocate.city.toLowerCase();
      const degree = advocate.degree.toLowerCase();
      const specs = advocate.specialties.map((specialty) => specialty.toLowerCase());
      const experience = advocate.yearsOfExperience.toString();
      const phone = advocate.phoneNumber.toString();

      return (
        first.includes(term) ||
        last.includes(term) ||
        city.includes(term) ||
        degree.includes(term) ||
        specs.some((spec) => spec.includes(term)) ||
        experience.includes(term) ||
        phone.includes(cleanTerm)
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
      <Banner>
        Healthcare Advocate Directory
      </Banner>

      {/* Search Section */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">
            Find Your Healthcare Advocate
          </h2>
          
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onReset={resetSearch}
          />

          <AdvocateResults 
            advocates={advocates}
            pagination={pagination}
            loading={loading}
            error={error}
            onPhoneClick={handlePhoneClick}
          />
        </div>
      </section>
    </div>
  );
}
