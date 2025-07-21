import React, { useState } from 'react';
import AppHeader from './History/AppHeader';
import HistorySidebar from './History/HistorySidebar';
import RequestSection from './Request/RequestSection';
import ResponseSection from './Response/ResponseSection';
import { useHistory } from '../hooks/useHistory';
import { useRequest } from '../hooks/useRequest';

const Assignment = () => {
  const [activeTab, setActiveTab] = useState('request');
  const [showHistory, setShowHistory] = useState(false);
  
  const { 
    history, 
    historyTotal, 
    searchQuery, 
    setSearchQuery, 
    historyPage, 
    setHistoryPage,
    loadFromHistory,
    deleteFromHistory,
    clearHistory,
    fetchHistory
  } = useHistory();

  const {
    method,
    url,
    headers,
    params,
    body,
    bodyType,
    response,
    loading,
    setMethod,
    setUrl,
    setHeaders,
    setParams,
    setBody,
    setBodyType,
    setResponse,
    makeRequest,
    updateHeader,
    updateParam,
    addHeader,
    removeHeader,
    addParam,
    removeParam,
    formatJson,
    copyResponse
  } = useRequest(fetchHistory, searchQuery);

  return (
    <div className="min-h-screen w-[100vw] bg-gray-50">
      <AppHeader className=""
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        historyTotal={historyTotal}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {showHistory && (
            <HistorySidebar
              history={history}
              historyTotal={historyTotal}
              historyPage={historyPage}
              searchQuery={searchQuery}
              setHistoryPage={setHistoryPage}
              setSearchQuery={setSearchQuery}
              loadFromHistory={loadFromHistory}
              deleteFromHistory={deleteFromHistory}
              clearHistory={clearHistory}
            />
          )}

          <div className={showHistory ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <RequestSection
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              method={method}
              url={url}
              headers={headers}
              params={params}
              body={body}
              bodyType={bodyType}
              loading={loading}
              setMethod={setMethod}
              setUrl={setUrl}
              setBody={setBody}
              setBodyType={setBodyType}
              makeRequest={makeRequest}
              updateHeader={updateHeader}
              updateParam={updateParam}
              addHeader={addHeader}
              removeHeader={removeHeader}
              addParam={addParam}
              removeParam={removeParam}
              formatJson={formatJson}
            />

            {response && (
              <ResponseSection 
                response={response} 
                copyResponse={copyResponse}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;