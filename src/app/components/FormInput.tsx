import React from "react";

type FormInputProps = {
  input: string;
  numGroups: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumGroupsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormInput: React.FC<FormInputProps> = ({
  input,
  numGroups,
  handleInputChange,
  handleNumGroupsChange,
  handleFormSubmit,
}) => (
  <form
    onSubmit={handleFormSubmit}
    className="mb-4 flex flex-col items-center w-full max-w-lg"
  >
    <div className="mb-2 w-full">
      <label htmlFor="student-names" className="block mb-1 text-sm font-medium">
        Student Names
      </label>
      <input
        type="text"
        id="student-names"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter student names, separated by commas"
        className="p-2 w-full border border-gray-400 rounded bg-gray-800 text-white placeholder-gray-500"
      />
    </div>
    <div className="mb-2 w-full">
      <label htmlFor="num-groups" className="block mb-1 text-sm font-medium">
        Number of Groups
      </label>
      <input
        type="number"
        id="num-groups"
        value={numGroups}
        onChange={handleNumGroupsChange}
        placeholder="Enter number of groups"
        className="p-2 w-full border border-gray-400 rounded bg-gray-800 text-white placeholder-gray-500"
      />
    </div>
    <div className="flex gap-2">
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Create Groups
      </button>
    </div>
  </form>
);

export default FormInput;
