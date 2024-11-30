import React, { useState } from "react";
import { Student } from "../utils/assignGroups";

type BlacklistInputProps = {
  students: Student[];
  blacklists: Record<Student, number[]>;
  onSubmit: (updatedBlacklists: Record<Student, number[]>) => void;
};

const BlacklistInput: React.FC<BlacklistInputProps> = ({
  students,
  blacklists,
  onSubmit,
}) => {
  const [currentBlacklists, setCurrentBlacklists] =
    useState<Record<Student, number[]>>(blacklists);

  const handleBlacklistChange = (student: Student, groupNumbers: string) => {
    const groupList = groupNumbers
      .split(",")
      .map(Number)
      .filter((num) => !isNaN(num));
    setCurrentBlacklists((prev) => ({
      ...prev,
      [student]: groupList,
    }));
  };

  const handleSubmit = () => {
    onSubmit(currentBlacklists);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Assign Blacklists</h2>
      <div className="w-2/3">
        {" "}
        {/* Changed width to 2/3 of the page */}
        {students.map((student) => (
          <div key={student} className="mb-2 w-full">
            <label className="block mb-1 text-sm font-medium">{student}</label>
            <input
              type="text"
              value={currentBlacklists[student]?.join(",") || ""}
              onChange={(e) => handleBlacklistChange(student, e.target.value)}
              placeholder="Enter group numbers to blacklist, separated by commas"
              className="p-2 w-full border border-gray-400 rounded bg-gray-800 text-white placeholder-gray-500"
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded mt-4"
        >
          Generate Groups
        </button>
      </div>
    </div>
  );
};

export default BlacklistInput;
