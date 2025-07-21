const HistoryPagination = ({ historyPage, historyTotal, setHistoryPage }) => (
  <div className="p-3 border-t flex justify-center">
    <button
      onClick={() => setHistoryPage(prev => Math.max(1, prev - 1))}
      disabled={historyPage === 1}
      className="px-3 py-1 text-sm border rounded-l disabled:opacity-50"
    >
      Prev
    </button>
    <span className="px-3 py-1 text-sm border-t border-b bg-gray-50">
      {historyPage}
    </span>
    <button
      onClick={() => setHistoryPage(prev => prev + 1)}
      disabled={historyPage * 20 >= historyTotal}
      className="px-3 py-1 text-sm border rounded-r disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default HistoryPagination;