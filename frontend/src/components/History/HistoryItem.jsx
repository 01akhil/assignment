import { Trash2, Clock } from 'lucide-react';
import { getStatusColor, getMethodColor } from '../../utils/historyUtils';

const HistoryItem = ({ request, loadFromHistory, deleteFromHistory }) => (
  <div
    className="p-3 border-b hover:bg-gray-50 cursor-pointer group"
    onClick={() => loadFromHistory(request)}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 flex-1">
        <span className={`text-xs font-medium px-2 py-1 rounded ${getMethodColor(request.method)}`}>
          {request.method}
        </span>
        <span className={`text-xs ${getStatusColor(request.status)}`}>
          {request.status}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteFromHistory(request.id);
        }}
        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
    <div className="mt-1">
      <p className="text-xs text-gray-600 truncate">{request.url}</p>
      <div className="flex items-center space-x-2 mt-1">
        <Clock className="w-3 h-3 text-gray-400" />
        <span className="text-xs text-gray-500">{request.responseTime}ms</span>
        <span className="text-xs text-gray-400">
          {new Date(request.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  </div>
);

export default HistoryItem;