import React from "react";
import { useDrag } from "react-dnd";

type DraggableStudentProps = {
  id: string;
  style: React.CSSProperties;
  children: React.ReactNode;
};

const DraggableStudent: React.FC<DraggableStudentProps> = ({
  id,
  style,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "STUDENT",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const draggableStyle = {
    opacity: isDragging ? 0.5 : 1,
    cursor: "move",
    ...style,
  };

  return (
    <div ref={drag} style={draggableStyle} className="absolute select-none">
      <div className="flex items-center p-1 bg-gray-700 border rounded text-white">
        {children}
      </div>
    </div>
  );
};

export default DraggableStudent;
