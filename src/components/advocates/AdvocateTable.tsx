import { Advocate } from "../../types/advocate.types";
import { formatPhoneNumber, cleanPhoneNumber } from "../../lib/utils";

interface AdvocateTableProps {
  advocates: Advocate[];
  search: string;
}

export function AdvocateTable({ advocates, search }: AdvocateTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/6">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/6">
              City
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/12">
              Degree
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/3">
              Specialties
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/12">
              Experience
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">
              Contact
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {advocates.map((advocate: Advocate) => (
            <tr
              key={advocate.id}
              className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 align-top w-1/6">
                <div className="font-medium text-gray-900">
                  {highlight(advocate.firstName, search)}{" "}
                  {highlight(advocate.lastName, search)}
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700 align-top w-1/6">
                {highlight(advocate.city, search)}
              </td>
              <td className="px-6 py-4 text-gray-700 align-top w-1/12">
                {highlight(advocate.degree, search)}
              </td>
              <td className="px-6 py-4 align-top w-1/3">
                <div className="flex flex-wrap gap-1">
                  {advocate.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-mediu bg-green-100 text-green-800">
                      {highlight(specialty, search)}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700 align-top w-1/12">
                {highlight(advocate.yearsOfExperience.toString(), search)} years
              </td>
              <td className="px-6 py-4 align-top w-1/4">
                <a
                  href={`tel:${cleanPhoneNumber(advocate.phoneNumber)}`}
                  className="text-green-700 hover:text-green-800 font-medium hover:underline transition-colors">
                  {highlight(formatPhoneNumber(advocate.phoneNumber), search)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const highlight = (text: string, search: string) => {
  if (!search || !text) {
    return text;
  }
  const parts = text.split(search);
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="bg-pink-100 text-black-900 border border-black rounded-md px-1 margin-0 padding-0">
              {search}
            </span>
          )}
        </span>
      ))}
    </>
  );
};
