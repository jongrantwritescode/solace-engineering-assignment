import { useRef } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export function SearchBar({ searchTerm, onSearchChange, onReset }: SearchBarProps) {
  const searchTermRef = useRef<HTMLSpanElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);

    if (searchTermRef.current) {
      searchTermRef.current.innerHTML = value;
    }
  };

  const handleReset = () => {
    onReset();
    if (searchTermRef.current) {
      searchTermRef.current.innerHTML = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Search Advocates
      </label>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name, city, specialty, or experience..."
          value={searchTerm}
          onChange={handleChange}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
        />
        <button
          onClick={handleReset}
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
  );
}
