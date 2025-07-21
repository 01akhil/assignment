import { Trash2 } from 'lucide-react';
const HistoryHeader = ({ clearHistory }) => (
  <div className="flex items-center justify-between mb-3">
    <h2 className="text-lg font-semibold">History</h2>
    <button
      onClick={clearHistory}
      className="text-red-400 hover:text-red-800"
      title="Clear all history"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);

export default HistoryHeader;