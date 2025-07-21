import { Send, History } from 'lucide-react';

const AppHeader = ({ activeTab, setActiveTab, showHistory, setShowHistory, historyTotal }) => (
  <div className="bg-white shadow-sm border-b flex items-center justify-center ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-bold text-gray-900">Assignment WareWe</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => { setActiveTab('request'); setShowHistory(false); }}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'request' ? 'bg-blue-400 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Send className="w-4 h-4 inline-block mr-2" />
              Request
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                showHistory ? 'bg-blue-400 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <History className="w-4 h-4 inline-block mr-2" />
              History ({historyTotal})
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AppHeader;