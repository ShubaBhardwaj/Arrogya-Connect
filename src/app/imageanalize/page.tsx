'use client';

import React, { useState, useRef, useEffect, useCallback, ChangeEvent, DragEvent, MouseEvent } from 'react';

// --- CONFIG ---
const API_BASE = "http://localhost:3050";
const ANALYZE_PATH = "/analysis";
const apiUrl = (path: string) => API_BASE.replace(/\/$/, '') + path;

// --- TYPE DEFINITIONS ---
interface AnalysisPayload {
  status: string;
  data: any; // Can be object, array, or primitive
}

interface LogMessage {
  msg: string;
  isError: boolean;
  timeoutId: NodeJS.Timeout | null;
}

// --- UTILITY FUNCTIONS ---

// Escapes HTML special characters
function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

// Prettifies keys: Patient_Information -> Patient Information
function prettyKey(k: string): string {
  if (!k) return '';
  return k.replace(/_/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
}

// --- REACT COMPONENT ---
const ImageAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisPayload, setAnalysisPayload] = useState<AnalysisPayload | null>(null);
  const [viewMode, setViewMode] = useState<'human' | 'raw'>('human');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [log, setLog] = useState<LogMessage>({ msg: '', isError: false, timeoutId: null });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Memoized function for displaying toast messages
  const showToast = useCallback((msg: string, isErr = false) => {
    // Clear previous timeout
    if (log.timeoutId) {
      clearTimeout(log.timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setLog(prev => ({ ...prev, msg: '' }));
    }, 2600);

    setLog({ msg, isError: isErr, timeoutId: newTimeoutId });
  }, [log.timeoutId]);

  // --- FILE HANDLING ---

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!(/image\/.+|application\/pdf/.test(f.type))) {
      alert('Unsupported file type. Use image or PDF.');
      return;
    }
    setSelectedFile(f);
    setAnalysisPayload(null);
    showToast('File ready');
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files && e.dataTransfer.files[0]);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files && e.target.files[0]);
  };

  const handleRemoveFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedFile(null);
    setAnalysisPayload(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setAnalysisPayload(null);
    setLog({ msg: '', isError: false, timeoutId: null });
  };

  // --- API CALL ---

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('Please pick a file first');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisPayload(null);
    showToast('processing...');

    const form = new FormData();
    form.append('file', selectedFile);

    try {
      const resp = await fetch(apiUrl(ANALYZE_PATH), { method: 'POST', body: form });
      const text = await resp.text();
      let json = null;
      try { json = JSON.parse(text); } catch (e) { json = null; }

      if (!resp.ok) {
        const err = (json && (json.detail || json.message)) || text || `HTTP ${resp.status}`;
        setAnalysisPayload({ status: 'error', data: err });
        showToast('Request failed', true);
      } else {
        const payload: AnalysisPayload = json ?? {};
        setAnalysisPayload(payload);
        showToast('Done');
      }
    } catch (err) {
      setAnalysisPayload({ status: 'network error', data: String(err) });
      showToast('Network error', true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- JSX Rendering Helpers (Replicating Vanilla JS DOM structure) ---

  // Recursive renderer for Human View
  const renderValue = (key: string, value: any, isArrayItem: boolean = false): React.ReactNode => {
    const prettyKeyStr = prettyKey(key);

    if (value === null || value === undefined) {
      return (
        <div key={key} className="py-2 border-b border-dashed border-[rgba(255,255,255,0.03)] text-sm leading-snug">
          <span className="inline-block w-40 text-[#7a94a3] font-bold">{prettyKeyStr}</span>
          <span className="text-[#e7f3f0]">—</span>
        </div>
      );
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      // Object => details/summary
      return (
        <details key={key} open className="my-1 p-2 rounded-lg bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.02)]">
          <summary className="cursor-pointer font-bold">{prettyKeyStr}</summary>
          <div className="pt-2 px-1">
            {Object.keys(value).map(k => renderValue(k, value[k]))}
          </div>
        </details>
      );
    }

    if (Array.isArray(value)) {
      // Array => details/summary + map items
      return (
        <details key={key} open className="my-1 p-2 rounded-lg bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.02)]">
          <summary className="cursor-pointer font-bold">
            {prettyKeyStr} — [{value.length}]
          </summary>
          <div className="pt-2 px-1">
            {value.map((item, idx) => (
              typeof item === 'object' ? (
                <div key={idx} className="p-2 rounded-lg mb-2 bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.02)]">
                  <div className="font-extrabold mb-1">Item {idx + 1}</div>
                  {Object.keys(item).map(k => renderValue(k, item[k], true))}
                </div>
              ) : (
                <div key={idx} className="py-2 border-b border-dashed border-[rgba(255,255,255,0.03)] text-sm leading-snug">
                  <span className="inline-block w-40 text-[#7a94a3] font-bold">
                    {prettyKeyStr} — {idx + 1}
                  </span>
                  <span className="text-[#e7f3f0] whitespace-pre-wrap">{String(item)}</span>
                </div>
              )
            ))}
          </div>
        </details>
      );
    }

    // Primitive (string/number/boolean)
    return (
      <div key={key} className={`py-2 border-b border-dashed border-[rgba(255,255,255,0.03)] text-sm leading-snug ${isArrayItem ? 'pl-2' : ''}`}>
        <span className="inline-block w-40 text-[#7a94a3] font-bold">{prettyKeyStr}</span>
        <span className="text-[#e7f3f0] whitespace-pre-wrap">{String(value)}</span>
      </div>
    );
  };

  // Top-level payload renderer
  const renderPayload = (payload: AnalysisPayload) => {
    const top = payload;
    let category = '';

    const dataSection = top?.data;
    if (dataSection && typeof dataSection === 'object') {
      category = dataSection.Category || dataSection.category || '';
    }

    const content: React.ReactNode[] = [];

    // 1. Status Row
    content.push(
      <div key="status" className="py-2 border-b border-dashed border-[rgba(255,255,255,0.03)] text-sm leading-snug">
        <span className="inline-block w-40 text-[#7a94a3] font-bold">Status</span>
        <span className="text-[#e7f3f0]">{top.status || 'N/A'}</span>
      </div>
    );

    // 2. Data Section
    if (dataSection && typeof dataSection === 'object') {
      content.push(
        Object.keys(dataSection)
          .map(k => renderValue(k, dataSection[k]))
      );
    } else if (top.status === 'error' || top.status === 'network error') {
       // Data is a string error message
       content.push(
         <div key="error-msg" className="py-2 border-b border-dashed border-[rgba(255,255,255,0.03)] text-sm leading-snug">
           <span className="inline-block w-40 text-[#7a94a3] font-bold">Message</span>
           <span className="text-[#e7f3f0] whitespace-pre-wrap">{String(dataSection)}</span>
         </div>
       );
    } else {
        // Fallback for non-object data (should be rare)
        content.push(
            <pre key="raw-data" className="bg-[#051213] border border-[#183033] p-3 rounded-lg overflow-auto whitespace-pre-wrap font-mono">{String(dataSection)}</pre>
        );
    }

    return { category, content };
  };

  const { category: resultCategory, content: humanViewContent } = analysisPayload ? renderPayload(analysisPayload) : { category: '', content: [] };
  const rawJson = analysisPayload ? JSON.stringify(analysisPayload, null, 2) : '';

  // Initial status view when no analysis is run
  const initialHumanView = (
    <div className="py-2 border-b border-dashed border-[rgba(255,255,255,0.03)] text-sm leading-snug">
      <span className="inline-block w-40 text-[#7a94a3] font-bold">Status</span>
      <span className="text-[#e7f3f0]">idle — add a file and click Analyze</span>
    </div>
  );
  
  // Tailwind color variables/classes for reference
  const accentColor = 'bg-[#10b981] text-[#05211b]';
  const mutedColor = 'bg-[#0c1717] text-[#7a94a3] border border-[#183033]';
  const badgeColor = 'bg-[#0e2220] text-[#bde6d6] border border-[#183033]';
  const panelColor = 'bg-[#0b1618] border border-[#183033]';
  const errorColor = 'bg-[#3a1f21] text-[#f0e0e1]';


  return (
    // Base Styles: body/html/background
    <div className="min-h-screen font-['Inter',_system-ui] text-[#e7f3f0] bg-gradient-to-b from-[#031011] to-[#061014]">
      <div className="max-w-7xl mx-auto p-5 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Upload Card */}
        <div className={`min-h-[420px] ${panelColor} rounded-xl p-5 shadow-2xl`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="m-0 text-lg font-semibold">Upload image or document</h3>
            <span className={badgeColor}>Backend: localhost:3050</span>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center text-[#7a94a3] transition-colors ${selectedFile ? 'border-transparent' : 'border-[rgba(255,255,255,0.03)] hover:border-[#144c3f]'}`}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#144c3f'; }}
            onDragLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'; }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div>
              <strong>Drag & drop</strong> or 
              <span className="text-[#10b981] cursor-pointer underline ml-1" id="browse">browse</span>
            </div>
            <div className="mt-2 text-[#7a94a3] text-sm">Tip: clear, well-lit images → better results.</div>
            <input type="file" ref={fileInputRef} accept="image/*,application/pdf" hidden onChange={handleFileInputChange} />
          </div>

          {/* File Thumbnails/Preview */}
          <div className="mt-4 flex flex-wrap" id="thumbs">
            {selectedFile && (
              <div className="w-32 h-32 rounded-xl bg-[#071012] border border-[rgba(255,255,255,0.02)] overflow-hidden relative mr-3">
                {selectedFile.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(selectedFile)} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="p-3 text-[#7a94a3] text-center text-sm break-all">{escapeHtml(selectedFile.name)}</div>
                )}
                <button 
                  className="absolute top-1.5 right-1.5 bg-[#081315] text-[#9bd9c5] px-1.5 py-1 rounded-lg text-xs cursor-pointer border border-[rgba(255,255,255,0.03)]"
                  onClick={handleRemoveFile}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <button className={`py-2 px-3 rounded-lg font-bold ${mutedColor}`} onClick={handleClear}>
              Clear
            </button>
            <button className={`py-2 px-3 rounded-lg font-bold ${accentColor} flex-1`} onClick={handleAnalyze} disabled={isAnalyzing || !selectedFile}>
              {isAnalyzing ? 'Analyzing…' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* 2. Result Card */}
        <div className={`min-h-[420px] ${panelColor} rounded-xl p-5 shadow-2xl flex flex-col`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="m-0 text-lg font-semibold">
              Result <small className="text-[#7a94a3] ml-3">{resultCategory}</small>
            </h3>
            <div className="flex gap-3 items-center">
              <div className="flex gap-2 text-sm">
                <button 
                  className={`py-1.5 px-2.5 rounded-lg ${viewMode === 'human' ? badgeColor : mutedColor}`} 
                  onClick={() => setViewMode('human')}
                >
                  Human View
                </button>
                <button 
                  className={`py-1.5 px-2.5 rounded-lg ${viewMode === 'raw' ? badgeColor : mutedColor}`} 
                  onClick={() => setViewMode('raw')}
                >
                  Raw JSON
                </button>
              </div>
              <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${log.isError ? errorColor : badgeColor}`}>
                {isAnalyzing ? 'processing...' : (log.msg || analysisPayload?.status || 'idle')}
              </span>
            </div>
          </div>

          {/* Human View */}
          <div className={`flex-1 overflow-auto pt-1 ${viewMode === 'human' ? 'block' : 'hidden'}`}>
            {analysisPayload ? humanViewContent : initialHumanView}
          </div>

          {/* Raw View */}
          <pre className={`bg-[#051213] border border-[#183033] p-3 rounded-lg overflow-auto whitespace-pre-wrap font-mono flex-1 ${viewMode === 'raw' ? 'block' : 'hidden'}`}>
            {rawJson}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;