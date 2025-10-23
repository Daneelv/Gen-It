import React, { useRef, useEffect } from 'react';

declare const JsBarcode: any;

interface BarcodeDisplayProps {
  value: string;
  format: string;
}

const BarcodeDisplay: React.FC<BarcodeDisplayProps> = ({ value, format }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, value, {
          format: format,
          displayValue: false,
          margin: 0,
          height: 60,
          width: 1.8, // Reduced from 2
        });
      } catch (e) {
        // Clear canvas on error
        const context = canvasRef.current.getContext('2d');
        if (context) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        console.error("JsBarcode error:", e);
      }
    }
  }, [value, format]);

  return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />;
};

export default BarcodeDisplay;