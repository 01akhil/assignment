// components/RequestParams.js
import { Plus, Minus } from 'lucide-react';

const RequestParams = ({ params, updateParam, addParam, removeParam }) => (
  <div className="space-y-3">
    {params.map((param, index) => (
      <div key={index} className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={param.enabled}
          onChange={(e) => updateParam(index, 'enabled', e.target.checked)}
          className="rounded"
        />
        <input
          type="text"
          placeholder="Key"
          value={param.key}
          onChange={(e) => updateParam(index, 'key', e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md text-sm"
        />
        <input
          type="text"
          placeholder="Value"
          value={param.value}
          onChange={(e) => updateParam(index, 'value', e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md text-sm"
        />
        <button
          onClick={() => removeParam(index)}
          className="text-red-500 hover:text-red-700"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    ))}
    <button
      onClick={addParam}
      className="flex items-center space-x-2 text-gray-500 hover:gray-900 text-sm"
    >
      <Plus className="w-4 h-4" />
      <span>Add Parameter</span>
    </button>
  </div>
);

export default RequestParams;