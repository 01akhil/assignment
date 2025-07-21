// components/RequestUrlBar.js
import { Send } from 'lucide-react';

const RequestUrlBar = ({ method, url, loading, setMethod, setUrl, makeRequest }) => (
  <div className="flex items-center space-x-3 mb-6">
    <select
      value={method}
      onChange={(e) => setMethod(e.target.value)}
      className="px-3 py-2 border rounded-md bg-white font-medium text-sm min-w-0 w-24"
    >
      <option value="GET">GET</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="PATCH">PATCH</option>
      <option value="DELETE">DELETE</option>
      <option value="HEAD">HEAD</option>
      <option value="OPTIONS">OPTIONS</option>
    </select>
    <input
      type="text"
      placeholder="Enter request URL"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onKeyPress={(e) => e.key === 'Enter' && makeRequest()}
    />
    <button
      onClick={makeRequest}
      disabled={loading}
      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send className="w-4 h-4" />
          <span>Send</span>
        </>
      )}
    </button>
  </div>
);

export default RequestUrlBar;