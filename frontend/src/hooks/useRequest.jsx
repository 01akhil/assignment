// useRequest.js
import { useState } from 'react';

export const useRequest = (fetchHistory, searchQuery) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '', enabled: true }]);
  const [params, setParams] = useState([{ key: '', value: '', enabled: true }]);
  const [body, setBody] = useState('');
  const [bodyType, setBodyType] = useState('JSON');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api';
 


  const makeRequest = async () => {
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const requestHeaders = {};
      headers.forEach(header => {
        if (header.enabled && header.key && header.value) {
          requestHeaders[header.key] = header.value;
        }
      });

      const requestParams = {};
      params.forEach(param => {
        if (param.enabled && param.key && param.value) {
          requestParams[param.key] = param.value;
        }
      });

      const requestData = {
        method,
        url: url.trim(),
        headers: requestHeaders,
        params: requestParams,
        body: ['POST', 'PUT', 'PATCH'].includes(method) ? body : undefined
      };

      const res = await fetch(`${API_BASE}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      const result = await res.json();
      
      setResponse({
        success: true,
        data: {
          status: result.status,
          statusText: result.statusText,
          headers: result.headers,
          data: result.body,
          responseTime: 0,
          size: JSON.stringify(result.body).length
        }
      });
      
      fetchHistory(1, searchQuery);
    } catch (error) {
      setResponse({
        success: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '', enabled: true }]);
  };

  const removeHeader = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateParam = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  const addParam = () => {
    setParams([...params, { key: '', value: '', enabled: true }]);
  };

  const removeParam = (index) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(body);
      setBody(JSON.stringify(parsed, null, 2));
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  const copyResponse = () => {
    if (response?.data) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      alert('Response copied to clipboard!');
    }
  };

  return {
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
  };
};