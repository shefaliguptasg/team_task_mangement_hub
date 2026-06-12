import React from "react";

type CustomeInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const CustomeInput = React.forwardRef<HTMLInputElement, CustomeInputProps>(
  ({ value, onChange }, ref) => {
    return (
      <input
        className={`w-full border rounded-xl px-2 py-3 outline-none transition border-gray-300 focus:ring-2 focus:ring-blue-400
                  `}
        type="text"
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  },
);

export default CustomeInput;
