import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="relative mb-5">
      <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />

      <input
        type="text"
        placeholder="Search by title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white rounded-xl border pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
