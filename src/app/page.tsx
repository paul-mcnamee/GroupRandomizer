"use client";
// test data --- Alice, Bob, Charlie, Dave, Eve, Frank, Grace, Hannah, Ian, Jack, Kate, Liam, Mia, Noah, Olivia, Paul, Quinn, Ryan, Sophia, Tom, Uma, Victor, Wendy, Xavier, Yara, Zoe
//              Alice Johnson, Bob Smith, Charlie Brown, Diana Ross, Edward Harris, Fiona Martinez, George Clark, Hannah White, Ian Davis, Julia Wilson, Kevin Thompson, Laura Garcia, Michael Anderson, Natalie Turner, Oscar Lopez, Patricia Young, Quincy Hall, Rachel King, Steven Wright, Tina Scott, Victor Green, Wendy Baker, Xavier Mitchell, Yvonne Sanders, Zachary Gray, Abigail Hughes, Benjamin Ward, Chloe Bryant, Daniel Phillips, Ella Stewart


import React, { useState } from "react";
import DnDContext from "./components/DnDContext";
import FormInput from "./components/FormInput";
import BlacklistInput from "./components/BlacklistInput";
import GroupDisplay from "./components/GroupDisplay";
import {
  assignGroups,
  Student,
  Group as GroupType,
} from "./utils/assignGroups";

const Home: React.FC = () => {
  const [input, setInput] = useState("");
  const [numGroups, setNumGroups] = useState<number>(3);
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [blacklists, setBlacklists] = useState<Record<Student, number[]>>({});
  const [page, setPage] = useState<"home" | "blacklist" | "groupDisplay">(
    "home"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleNumGroupsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumGroups(Number(e.target.value));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage("blacklist");
  };

  const handleBlacklistSubmit = (
    updatedBlacklists: Record<Student, number[]>
  ) => {
    setBlacklists(updatedBlacklists);
    generateGroups(updatedBlacklists);
  };

  const handleDragEnd = (student: Student, targetGroupNumber: number) => {
    setGroups((prevGroups) => {
      const newGroups = prevGroups.map((group) => {
        if (group.students.includes(student)) {
          return {
            ...group,
            students: group.students.filter((s) => s !== student),
          };
        }
        return group;
      });
      const targetGroup = newGroups.find(
        (group) => group.groupNumber === targetGroupNumber
      );
      if (targetGroup) {
        targetGroup.students.push(student);
      }
      return newGroups;
    });
  };

  const generateGroups = (updatedBlacklists: Record<Student, number[]>) => {
    const students: Student[] = input.split(",").map((name) => name.trim());
    const assignedGroups = assignGroups(students, numGroups, updatedBlacklists);
    setGroups(assignedGroups);
    setPage("groupDisplay");
  };

  return (
    <DnDContext>
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 dark:text-white">
        {page === "home" && (
          <FormInput
            input={input}
            numGroups={numGroups}
            handleInputChange={handleInputChange}
            handleNumGroupsChange={handleNumGroupsChange}
            handleFormSubmit={handleFormSubmit}
          />
        )}

        {page === "blacklist" && (
          <BlacklistInput
            students={input.split(",").map((name) => name.trim())}
            blacklists={blacklists}
            onSubmit={handleBlacklistSubmit}
          />
        )}

        {page === "groupDisplay" && (
          <GroupDisplay
            groups={groups}
            blacklists={blacklists}
            moveStudent={handleDragEnd}
            generateGroups={generateGroups}
          />
        )}
      </div>
    </DnDContext>
  );
};

export default Home;
