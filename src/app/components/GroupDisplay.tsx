import React from "react";
import { Group as GroupType, Student } from "../utils/assignGroups";
import Group from "./Group";

type GroupDisplayProps = {
  groups: GroupType[];
  blacklists: Record<Student, number[]>;
  moveStudent: (student: Student, targetGroupNumber: number) => void;
  generateGroups: (blacklists: Record<Student, number[]>) => void;
};

const GroupDisplay: React.FC<GroupDisplayProps> = ({
  groups,
  blacklists,
  moveStudent,
  generateGroups,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center">
        {groups.map((group, index) => (
          <Group
            key={group.groupNumber}
            group={group}
            index={index}
            moveStudent={moveStudent}
          />
        ))}
      </div>
      <button
        onClick={() => generateGroups(blacklists)}
        className="p-2 bg-blue-500 text-white rounded mt-4"
      >
        Generate Groups
      </button>
    </div>
  );
};

export default GroupDisplay;
