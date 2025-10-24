import React from 'react';
import { usePersistentState } from '../App';
import { generateImei, exportToPdf } from '../utils/helpers';
import BarcodeDisplay from '../components/BarcodeDisplay';

const ImeiGenerator: React.FC = () => {
  const [tac, setTac] = usePersistentState<string>('imei_tac', '');
  const [count, setCount] = usePersistentState<number>('imei_count', 10);
  const [generatedImeis, setGeneratedImeis] = usePersistentState<string[]>('imei_generated', []);
  const [showBarcodes, setShowBarcodes] = usePersistentState<boolean>('imei_showBarcodes', false);
  const [copiedValue, setCopiedValue] = React.useState<string | null>(null);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 1500);
    });
  };

  const handleGenerate = () => {
    const imeis = Array.from({ length: count }, () => generateImei(tac));
    setGeneratedImeis(imeis);
  };

  const handleClear = () => {
    setGeneratedImeis([]);
  };

  const handleExport = () => {
    if (generatedImeis.length > 0) {
      exportToPdf(generatedImeis, 'CODE128', 'IMEI Numbers');
    }
  };

  const inputFieldClasses = "block w-full p-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500";
  const btnClasses = "px-5 py-2.5 font-medium rounded-lg text-sm transition-colors";
  const btnPrimary = `text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed`;
  const btnSecondary = `bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-500 disabled:cursor-not-allowed`;
  const btnSuccess = `text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed`;
  const btnDanger = `text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed`;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">IMEI Number Generator</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tac" className="block mb-2 text-sm font-medium">TAC (Optional, 8 digits)</label>
            <input type="text" id="tac" value={tac} maxLength={8} onChange={e => setTac(e.target.value.replace(/[^0-9]/g, ''))} className={inputFieldClasses} placeholder="e.g., 35891203" />
          </div>
          <div>
            <label htmlFor="count" className="block mb-2 text-sm font-medium">Count</label>
            <input type="number" id="count" value={count} onChange={e => setCount(Math.max(1, Math.min(100, +e.target.value)))} className={inputFieldClasses} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={handleGenerate} className={`${btnClasses} ${btnPrimary}`}>Generate IMEIs</button>
          <button onClick={() => setShowBarcodes(!showBarcodes)} className={`${btnClasses} ${btnSecondary}`} disabled={generatedImeis.length === 0}>
            {showBarcodes ? 'Show Text' : 'Show Barcodes'}
          </button>
          <button onClick={handleExport} className={`${btnClasses} ${btnSuccess}`} disabled={generatedImeis.length === 0}>Export PDF</button>
          <button onClick={handleClear} className={`${btnClasses} ${btnDanger}`} disabled={generatedImeis.length === 0}>Clear</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Generated IMEI Numbers</h2>
        {generatedImeis.length > 0 ? (
          <div className={`grid gap-4 ${showBarcodes ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-3'} max-h-96 overflow-y-auto p-2 border rounded-lg dark:border-gray-700`}>
            {generatedImeis.map((imei, index) => (
              <div
                key={index}
                className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => handleCopy(imei)}
              >
                {showBarcodes ? (
                  <div className="flex flex-col items-center">
                    <BarcodeDisplay value={imei} format="CODE128" />
                    <p className="mt-2 text-sm font-mono tracking-wider">{copiedValue === imei ? 'Copied!' : imei}</p>
                  </div>
                ) : (
                  <p className="font-mono text-sm md:text-base tracking-wider p-2">{copiedValue === imei ? 'Copied!' : imei}</p>
                )}
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500 dark:text-gray-400">Generated IMEIs will appear here.</p>}
      </div>
    </div>
  );
};

export default ImeiGenerator;
