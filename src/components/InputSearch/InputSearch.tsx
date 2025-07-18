import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface InputSearchProps {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const InputSearch: React.FC<InputSearchProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search..."
        className={`w-full border dark:text-black bg-gray-100 border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500${
          className ? ` ${className}` : ""
        }`}
      />
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  );
};
