import RequestUrlBar from './RequestUrlBar';
import RequestTabs from './RequestTabs';
import RequestParams from './RequestParams';
import RequestHeaders from './RequestHeaders';
import RequestBody from './RequestBody';

const RequestSection = ({
  activeTab,
  setActiveTab,
  method,
  url,
  headers,
  params,
  body,
  bodyType,
  loading,
  setMethod,
  setUrl,
  setBody,
  setBodyType,
  makeRequest,
  updateHeader,
  updateParam,
  addHeader,
  removeHeader,
  addParam,
  removeParam,
  formatJson
}) => (
  <div className="bg-white rounded-lg shadow-sm border mb-6">
    <div className="p-6">
      <RequestUrlBar
        method={method}
        url={url}
        loading={loading}
        setMethod={setMethod}
        setUrl={setUrl}
        makeRequest={makeRequest}
      />

      <RequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'params' && (
        <RequestParams
          params={params}
          updateParam={updateParam}
          addParam={addParam}
          removeParam={removeParam}
        />
      )}

      {activeTab === 'headers' && (
        <RequestHeaders
          headers={headers}
          updateHeader={updateHeader}
          addHeader={addHeader}
          removeHeader={removeHeader}
        />
      )}

      {activeTab === 'body' && (
        <RequestBody
          body={body}
          bodyType={bodyType}
          setBody={setBody}
          setBodyType={setBodyType}
          formatJson={formatJson}
        />
      )}
    </div>
  </div>
);

export default RequestSection;