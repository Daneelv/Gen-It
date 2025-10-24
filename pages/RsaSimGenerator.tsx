import React, { useMemo } from 'react';
import { usePersistentState } from '../App';
import { generateRsaSim, exportToPdf } from '../utils/helpers';
import BarcodeDisplay from '../components/BarcodeDisplay';

type Carrier = 'Vodacom' | 'MTN' | 'Telkom' | 'CellC' | '8ta';
type GeneratedSim = { carrier: Carrier; number: string };

const ALL_CARRIERS: Carrier[] = ['Vodacom', 'MTN', 'Telkom', 'CellC', '8ta'];

const RsaSimGenerator: React.FC = () => {
  const [carriers, setCarriers] = usePersistentState<Carrier[]>('sim_carriers', ['Vodacom']);
  const [count, setCount] = usePersistentState<number>('sim_count', 10);
  const [generatedSims, setGeneratedSims] = usePersistentState<GeneratedSim[]>('sim_generated', []);
  const [showBarcodes, setShowBarcodes] = usePersistentState<boolean>('sim_showBarcodes', false);
  const [copiedValue, setCopiedValue] = React.useState<string | null>(null);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 1500);
    });
  };

  const handleCarrierChange = (carrier: Carrier) => {
    setCarriers(prev => {
      const newCarriers = prev.includes(carrier)
        ? prev.filter(c => c !== carrier)
        : [...prev, carrier];
      // Ensure at least one carrier is always selected
      return newCarriers.length > 0 ? newCarriers : prev;
    });
  };

  const handleGenerate = () => {
    if (carriers.length === 0) return;
    const sims = Array.from({ length: count }, () => {
      const randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];
      return {
        carrier: randomCarrier,
        number: generateRsaSim(randomCarrier),
      };
    });
    setGeneratedSims(sims);
  };
  
  const handleClear = () => {
    setGeneratedSims([]);
  };

  const handleExport = () => {
    if (generatedSims.length > 0) {
      const title = carriers.length > 1 ? 'Mixed Carrier SIMs' : `${carriers[0]} SIM Numbers`;
      const simNumbers = generatedSims.map(sim => sim.number);
      exportToPdf(simNumbers, 'CODE128', title);
    }
  };
  
  const groupedSims = useMemo(() => {
    // FIX: The initial value for `reduce` was an untyped empty object, causing incorrect type inference.
    // Providing a generic type argument to `reduce` is a more robust way to ensure the accumulator is typed correctly.
    return generatedSims.reduce<Record<string, GeneratedSim[]>>((acc, sim) => {
      (acc[sim.carrier] = acc[sim.carrier] || []).push(sim);
      return acc;
    }, {});
  }, [generatedSims]);

  const getCarrierLabel = (carrier: Carrier) => {
    if (carrier === 'CellC') return 'Cell C';
    return carrier;
  }

  const inputFieldClasses = "block w-full p-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500";
  const btnClasses = "px-5 py-2.5 font-medium rounded-lg text-sm transition-colors";
  const btnPrimary = `text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed`;
  const btnSecondary = `bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-500 disabled:cursor-not-allowed`;
  const btnSuccess = `text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed`;
  const btnDanger = `text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed`;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">RSA SIM Card Generator</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-3 text-sm font-medium">Carriers</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {ALL_CARRIERS.map(carrier => (
                <div key={carrier} className="flex items-center">
                  <input
                    id={`carrier-${carrier}`}
                    type="checkbox"
                    checked={carriers.includes(carrier)}
                    onChange={() => handleCarrierChange(carrier)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`carrier-${carrier}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{getCarrierLabel(carrier)}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="count" className="block mb-2 text-sm font-medium">Count</label>
            <input type="number" id="count" value={count} onChange={e => setCount(Math.max(1, Math.min(100, +e.target.value)))} className={inputFieldClasses} />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={handleGenerate} className={`${btnClasses} ${btnPrimary}`}>Generate SIMs</button>
          <button onClick={() => setShowBarcodes(!showBarcodes)} className={`${btnClasses} ${btnSecondary}`} disabled={generatedSims.length === 0}>
            {showBarcodes ? 'Show Text' : 'Show Barcodes'}
          </button>
          <button onClick={handleExport} className={`${btnClasses} ${btnSuccess}`} disabled={generatedSims.length === 0}>Export PDF</button>
          <button onClick={handleClear} className={`${btnClasses} ${btnDanger}`} disabled={generatedSims.length === 0}>Clear</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Generated SIM Numbers</h2>
        {generatedSims.length > 0 ? (
          <div className="max-h-96 overflow-y-auto p-2 border rounded-lg dark:border-gray-700 space-y-4">
            {/* FIX: Use Object.keys to iterate over grouped SIMs. This avoids potential type inference issues with Object.entries where the value can be inferred as 'unknown'. */}
            {Object.keys(groupedSims).map((carrier) => (
              <div key={carrier}>
                <h3 className="text-lg font-semibold mb-2 sticky top-0 bg-white dark:bg-gray-800 py-1 px-2 -mx-2">{getCarrierLabel(carrier as Carrier)}</h3>
                <div className={`grid gap-4 ${showBarcodes ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                  {groupedSims[carrier].map((sim, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => handleCopy(sim.number)}
                    >
                      {showBarcodes ? (
                        <div className="flex flex-col items-center">
                          <BarcodeDisplay value={sim.number} format="CODE128" />
                          <p className="mt-2 text-sm font-mono tracking-wider">{copiedValue === sim.number ? 'Copied!' : sim.number}</p>
                        </div>
                      ) : (
                        <p className="font-mono text-xs md:text-sm tracking-wider p-2">{copiedValue === sim.number ? 'Copied!' : sim.number}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500 dark:text-gray-400">Generated SIMs will appear here.</p>}
      </div>
    </div>
  );
};

export default RsaSimGenerator;
