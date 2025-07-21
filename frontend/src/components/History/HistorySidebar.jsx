import HistoryHeader from './HistoryHeader';
import HistorySearch from './HistorySearch';
import HistoryItem from './HistoryItem';
import HistoryPagination from './HistoryPagination';

const HistorySidebar = ({
  history,
  historyTotal,
  historyPage,
  searchQuery,
  setHistoryPage,
  setSearchQuery,
  loadFromHistory,
  deleteFromHistory,
  clearHistory
}) => (
  <div className="lg:col-span-1">
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <HistoryHeader clearHistory={clearHistory} />
        <HistorySearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setHistoryPage={setHistoryPage}
        />
      </div>
      <div className="max-h-96 overflow-y-auto">
        {history.map((request) => (
          <HistoryItem
            key={request.id}
            request={request}
            loadFromHistory={loadFromHistory}
            deleteFromHistory={deleteFromHistory}
          />
        ))}
      </div>
      {historyTotal > 20 && (
        <HistoryPagination
          historyPage={historyPage}
          historyTotal={historyTotal}
          setHistoryPage={setHistoryPage}
        />
      )}
    </div>
  </div>
);

export default HistorySidebar;