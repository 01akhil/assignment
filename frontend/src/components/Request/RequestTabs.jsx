// components/RequestTabs.js
const RequestTabs = ({ activeTab, setActiveTab }) => (
  <div className="border-b mb-4">
    <nav className="-mb-px flex space-x-8">
      {['Params', 'Headers', 'Body'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === tab.toLowerCase()
              ? 'border-blue-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  </div>
);

export default RequestTabs;