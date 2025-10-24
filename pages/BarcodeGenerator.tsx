import React from 'react';
import { usePersistentState } from '../App';
import { exportToPdf } from '../utils/helpers';
import BarcodeDisplay from '../components/BarcodeDisplay';

const BarcodeGenerator: React.FC = () => {
  const [textList, setTextList] = usePersistentState<string>('barcode_textList', '123456789\nABC-123\nTEST-DATA');
  const [barcodeType, setBarcodeType] = usePersistentState<string>('barcode_barcodeType', 'CODE128');
  const [generatedItems, setGeneratedItems] = usePersistentState<string[]>('barcode_generatedItems', []);
  const [copiedValue, setCopiedValue] = React.useState<string | null>(null);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 1500);
    });
  };

  const handleGenerate = () => {
    const items = textList.split('\n').filter(line => line.trim() !== '');
    setGeneratedItems(items);
  };

  const handleExport = () => {
    if (generatedItems.length > 0) {
      exportToPdf(generatedItems, barcodeType, 'Generated Barcodes');
    }
  };
  
  const handleClear = () => {
    setGeneratedItems([]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Barcode Generator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="text-list" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Values (one per line)</label>
              <textarea
                id="text-list"
                rows={10}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={textList}
                onChange={(e) => setTextList(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="barcode-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Barcode Type</label>
              <select
                id="barcode-type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={barcodeType}
                onChange={(e) => setBarcodeType(e.target.value)}
              >
                <option value="CODE128">Code 128</option>
                <option value="CODE39">Code 39</option>
                <option value="EAN13">EAN-13</option>
                <option value="UPC">UPC</option>
                <option value="ITF">ITF</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button onClick={handleGenerate} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Generate
              </button>
              <button onClick={handleExport} disabled={generatedItems.length === 0} className="w-full text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Export PDF
              </button>
            </div>
             <button onClick={handleClear} disabled={generatedItems.length === 0} className="w-full text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Clear
              </button>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          {generatedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[30rem] overflow-y-auto p-2 border rounded-lg dark:border-gray-700">
              {generatedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleCopy(item)}
                >
                  <BarcodeDisplay value={item} format={barcodeType} />
                  <p className="mt-2 text-sm font-mono tracking-wider">{copiedValue === item ? 'Copied!' : item}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              Click "Generate" to see barcode previews.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
