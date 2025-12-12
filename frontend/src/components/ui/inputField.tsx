import type { InputHTMLAttributes } from "react";

type Props = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = ({ label, name, ...rest }: Props) => {
  return (
    <div className="mb-2">
      <label className="block text-lg font-bold">{label}</label>
      <input
        required
        name={name}
        {...rest}
        className="mb-2 w-full rounded border border-gray-300 bg-white px-6 py-3 shadow-md"
      />
    </div>
  );
};

export default InputField;
