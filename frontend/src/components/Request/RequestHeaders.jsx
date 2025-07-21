// components/RequestHeaders.js
import { Plus, Minus } from 'lucide-react';

const RequestHeaders = ({ headers, updateHeader, addHeader, removeHeader }) => (
  <div className="space-y-3">
    {headers.map((header, index) => (
      <div key={index} className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={header.enabled}
          onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
          className="rounded"
        />
        <input
          type="text"
          placeholder="Key"
          value={header.key}
          onChange={(e) => updateHeader(index, 'key', e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md text-sm"
        />
        <input
          type="text"
          placeholder="Value"
          value={header.value}
          onChange={(e) => updateHeader(index, 'value', e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md text-sm"
        />
        <button
          onClick={() => removeHeader(index)}
          className="text-red-500 hover:text-red-700"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    ))}
    <button
      onClick={addHeader}
      className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 text-sm"
    >
      <Plus className="w-4 h-4" />
      <span>Add Header</span>
    </button>
  </div>
);

export default RequestHeaders;