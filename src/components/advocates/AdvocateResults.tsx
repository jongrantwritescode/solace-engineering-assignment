import { Advocate } from "../../types/advocate.types";
import { PaginationInfo as PaginationInfoType } from "../../types/advocate.types";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { AdvocateTable } from "./AdvocateTable";
import { PaginationInfo } from "./PaginationInfo";

interface AdvocateResultsProps {
  advocates: Advocate[];
  pagination: PaginationInfoType | null;
  loading: boolean;
  error: string | null;
  onPhoneClick: (phoneNumber: string) => void;
}

export function AdvocateResults({ 
  advocates, 
  pagination, 
  loading, 
  error, 
  onPhoneClick 
}: AdvocateResultsProps) {
  return (
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
          <AdvocateTable advocates={advocates} onPhoneClick={onPhoneClick} />
          
          {advocates.length === 0 && !loading && (
            <div className="px-6 py-12 text-center text-gray-500">
              <p>No advocates found matching your search criteria.</p>
            </div>
          )}

          {pagination && (
            <PaginationInfo pagination={pagination} />
          )}
        </>
      )}
    </div>
  );
}
