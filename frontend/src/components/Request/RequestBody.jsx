// components/RequestBody.js
const RequestBody = ({ body, bodyType, setBody, setBodyType, formatJson }) => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4">
      <select
        value={bodyType}
        onChange={(e) => setBodyType(e.target.value)}
        className="px-3 py-2 border rounded-md bg-white text-sm"
      >
        <option value="JSON">JSON</option>
        <option value="Text">Text</option>
        <option value="XML">XML</option>
        <option value="Form Data">Form Data</option>
      </select>
      {bodyType === 'JSON' && (
        <button
          onClick={formatJson}
          className="px-3 py-2 text-sm text-gray-500 hover:text-white border border-blue-200 rounded-md"
        >
          Format JSON
        </button>
      )}
    </div>
    <textarea
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder={bodyType === 'JSON' ? '{\n  "key": "value"\n}' : 'Enter request body...'}
      className="w-full h-40 px-4 py-3 border rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default RequestBody;