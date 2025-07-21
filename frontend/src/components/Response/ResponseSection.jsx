import { Copy, FileText } from 'lucide-react';

const getStatusColor = (status) => {
  if (status >= 200 && status < 300) return 'text-green-600';
  if (status >= 400 && status < 500) return 'text-yellow-600';
  if (status >= 500) return 'text-red-600';
  return 'text-gray-600';
};

const ResponseSection = ({ response, copyResponse }) => (
  <div className="bg-white rounded-lg shadow-sm border">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Response</h2>
        <div className="flex items-center space-x-4">
          {response.success && response.data && (
            <>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className={`font-medium ${getStatusColor(response.data.status)}`}>
                  Status: {response.data.status} {response.data.statusText}
                </span>
                <span>Time: {response.data.responseTime}ms</span>
                <span>Size: {response.data.size ? `${(response.data.size / 1024).toFixed(2)} KB` : 'N/A'}</span>
              </div>
              <button
                onClick={copyResponse}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 rounded-md"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </>
          )}
        </div>
      </div>

      {response.success ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Headers</h3>
            <div className="bg-gray-50 rounded-md p-3 max-h-40 overflow-y-auto">
              <pre className="text-xs text-gray-600">
                {JSON.stringify(response.data.headers, null, 2)}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Body</h3>
            <div className="bg-gray-50 rounded-md p-4 max-h-96 overflow-auto">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {typeof response.data.data === 'object' 
                  ? JSON.stringify(response.data.data, null, 2)
                  : response.data.data
                }
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center space-x-2">
            <div className="text-red-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800">Request Failed</h3>
              <p className="text-sm text-red-700 mt-1">{response.error}</p>
              {response.status > 0 && (
                <p className="text-sm text-red-600 mt-1">
                  Status: {response.status} {response.statusText}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ResponseSection;