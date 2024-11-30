import React from "react";
import { useDrop } from "react-dnd";
import { Group as GroupType, Student } from "../utils/assignGroups";
import DraggableStudent from "./DraggableStudent";

type GroupProps = {
  group: GroupType;
  index: number;
  moveStudent: (student: Student, targetGroupNumber: number) => void;
};

const Group: React.FC<GroupProps> = ({ group, index, moveStudent }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "STUDENT",
    drop: (item: { id: Student }) => moveStudent(item.id, group.groupNumber),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const circleRadius = 25; // Circle radius reduced by 50%
  const textRadius = circleRadius + 60; // Adjust distance from the center

  const getNamePositionStyles = (index: number, length: number) => {
    const angle = (360 / length) * index; // Calculate the angle for each name
    const radians = (angle * Math.PI) / 180; // Convert angle to radians

    return {
      left: `calc(50% + ${textRadius * Math.cos(radians)}px)`,
      top: `calc(50% + ${textRadius * Math.sin(radians)}px)`,
      transform: `translate(-50%, -50%)`, // Keep the text horizontal
      transformOrigin: "center",
    };
  };

  return (
    <div ref={drop} className="relative m-20 p-10">
      <div className="z-10 border-2 border-gray-700 rounded-full w-20 h-20 flex items-center justify-center text-xl font-bold bg-gray-800 text-white">
        {group.groupNumber}
      </div>
      <div
        className={`absolute inset-0 w-full h-full ${
          isOver ? "bg-gray-700" : ""
        }`}
      >
        {group.students.map((student, studentIndex) => {
          const styles = getNamePositionStyles(
            studentIndex,
            group.students.length
          );

          return (
            <DraggableStudent key={student} id={student} style={styles}>
              {student}
            </DraggableStudent>
          );
        })}
      </div>
    </div>
  );
};

export default Group;
