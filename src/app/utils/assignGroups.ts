export type Student = string;

export type Group = {
  groupNumber: number;
  students: Student[];
  size: number; // Add the size field
};

export const assignGroups = (students: Student[], numGroups: number, blacklists: Record<Student, number[]>): Group[] => {
  let allStudents = [...students];

  // Initialize empty groups
  let groups: Group[] = Array.from({ length: numGroups }, (_, index) => ({
    groupNumber: index + 1,
    students: [],
    size: 0, // Initialize the size
  }));

  // Shuffle students
  allStudents = allStudents.sort(() => Math.random() - 0.5);

  let groupIndex = 0;

  // Distribute students while respecting blacklists
  for (const student of allStudents) {
    let assigned = false;

    // Attempt to place the student in a suitable group
    for (let i = 0; i < numGroups; i++) {
      const currentIndex = (groupIndex + i) % numGroups;
      const group = groups[currentIndex];

      if (!blacklists[student]?.includes(group.groupNumber)) {
        group.students.push(student);
        group.size = group.students.length; // Update the size
        groupIndex = currentIndex + 1; // Move to the next group
        assigned = true;
        break;
      }
    }

    // If no suitable group found, place in the group with the least students
    if (!assigned) {
      groups.sort((a, b) => a.students.length - b.students.length);
      groups[0].students.push(student);
      groups[0].size = groups[0].students.length; // Update the size
    }
  }

  return groups;
};
