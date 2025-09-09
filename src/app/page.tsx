"use client";

import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { SearchBar, AdvocateResults } from "../components/advocates";
import { Banner } from "../components/ui";

export default function Home() {
  const {
    searchTerm,
    data: advocates,
    pagination,
    loading,
    error,
    handleSearchChange,
    resetSearch,
  } = useDebouncedSearch(300);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <Banner>Healthcare Advocate Directory</Banner>

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
            search={searchTerm}
            pagination={pagination}
            loading={loading}
            error={error}
          />
        </div>
      </section>
    </div>
  );
}
