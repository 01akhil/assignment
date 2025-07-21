import { Search } from 'lucide-react';
const HistorySearch = ({ searchQuery, setSearchQuery, setHistoryPage }) => (
  <div className="relative">
    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search history..."
      className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setHistoryPage(1);
      }}
    />
  </div>
);

export default HistorySearch;