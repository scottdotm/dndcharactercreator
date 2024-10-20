import React from "react";
import { DropdownProps } from "@/app/interface/dropdown-props";

export function Dropdown({
  data,
  selectedData,
  setSelectedData,
  isLoading,
}: DropdownProps): JSX.Element {
  return (
    <div>
      {isLoading ? (
        <p>Loading from API..</p>
      ) : (
        <select
          value={selectedData}
          onChange={(e) => setSelectedData(e.target.value)}
          disabled={isLoading} // Disable select while loading
        >
          <option value="">Select an option</option>
          {data.map((data) => (
            <option key={data.index} value={data.index}>
              {data.name}
            </option>
          ))}
          {/* Display a loading option if alignments are empty and not loading */}
          {!isLoading && data.length === 0 && (
            <option value="" disabled>
              Loading from API...
            </option>
          )}
        </select>
      )}
    </div>
  );
}
