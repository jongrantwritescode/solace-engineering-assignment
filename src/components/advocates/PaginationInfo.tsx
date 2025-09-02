import type { PaginationInfo as PaginationInfoType } from "../../types/advocate.types";

interface PaginationInfoProps {
  pagination: PaginationInfoType;
}

export function PaginationInfo({ pagination }: PaginationInfoProps) {
  return (
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
  );
}
