// This makes TypeScript happy about the CDN-loaded libraries
declare const jspdf: any;
declare const JsBarcode: any;

// --- Luhn Algorithm ---
// A standard, vetted Luhn checksum calculation.
const calculateLuhn = (base: string): number => {
  const digits = base.split('').map(Number);
  let checksum = 0;
  const len = digits.length;

  for (let i = 0; i < len; i++) {
    // Iterate from right to left
    let digit = digits[len - 1 - i];

    // Double every second digit, starting from the rightmost digit of the base number.
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    checksum += digit;
  }

  return (10 - (checksum % 10)) % 10;
};


// --- RSA ID Luhn Algorithm (Specific Version) ---
const calculateSaIdLuhn = (base: string): number => {
    let sumOdd = 0;
    let evenDigitsStr = '';
    // 1. Sum odd-positioned digits
    for (let i = 0; i < base.length; i++) {
        if (i % 2 === 0) { // 1st, 3rd, 5th... (0-indexed)
            sumOdd += parseInt(base[i], 10);
        } else { // 2nd, 4th, 6th...
            evenDigitsStr += base[i];
        }
    }
    // 2. Multiply even-positioned digits number by 2
    const evenNum = parseInt(evenDigitsStr, 10) * 2;
    const evenNumStr = evenNum.toString();
    
    // 3. Sum the digits of the result from step 2
    let sumEvenDigits = 0;
    for (let i = 0; i < evenNumStr.length; i++) {
        sumEvenDigits += parseInt(evenNumStr[i], 10);
    }
    
    // 4. Sum the results of step 1 and 3
    const totalSum = sumOdd + sumEvenDigits;
    
    // 5. Calculate check digit
    const checkDigit = (10 - (totalSum % 10)) % 10;
    
    return checkDigit;
};


// --- RSA ID Generator ---
export const generateRsaId = (options: { minAge: number; maxAge: number; gender: 'Male' | 'Female' | 'Random' }): string => {
  const { minAge, maxAge, gender } = options;
  const now = new Date();
  
  const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
  const birthYear = now.getFullYear() - age;
  
  const birthDate = new Date(birthYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

  const yy = birthDate.getFullYear().toString().slice(-2);
  const mm = (birthDate.getMonth() + 1).toString().padStart(2, '0');
  const dd = birthDate.getDate().toString().padStart(2, '0');
  const datePart = `${yy}${mm}${dd}`;

  let genderDigit: number;
  const resolvedGender = gender === 'Random' ? (Math.random() > 0.5 ? 'Male' : 'Female') : gender;
  genderDigit = resolvedGender === 'Male' ? 5 + Math.floor(Math.random() * 5) : Math.floor(Math.random() * 5);
  
  const ssss = `${genderDigit}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  const c = '0'; // SA Citizen
  const a = '8'; // Per standard, was race identifier
  
  const baseId = `${datePart}${ssss}${c}${a}`;
  const z = calculateSaIdLuhn(baseId); // Use the correct SA ID Luhn check
  
  return `${baseId}${z}`;
};

// --- RSA SIM Generator ---
// Configuration based on carrier requirements.
// ICCID is the standard SIM card number format.
// MTN uses a special MSISDN (phone number) format with a non-standard Luhn check based on a constructed reference string.
const SIM_CONFIG = {
  Vodacom: {
    type: 'ICCID',
    prefixes: ['892701'],
    length: 20
  },
  MTN: {
    type: 'MTN_MSISDN', // Custom type for this specific validation logic
  },
  Telkom: {
    type: 'ICCID',
    prefixes: ['892703'],
    length: 20
  },
  CellC: {
    type: 'ICCID',
    prefixes: ['892707'],
    length: 20
  },
  '8ta': {
    type: 'ICCID',
    prefixes: ['892702'],
    length: 20
  },
} as const;

export const generateRsaSim = (carrier: keyof typeof SIM_CONFIG): string => {
  const config = SIM_CONFIG[carrier];

  if (config.type === 'MTN_MSISDN') {
    const length = Math.random() > 0.5 ? 11 : 10; // Randomly choose between 10 and 11 digits

    if (length === 10) {
      // Per the validation logic, 10-digit numbers are prefixed with '892700001' to form a 20-digit string for Luhn check.
      // We assume a standard SA mobile format starting with '0'.
      let randomNumberPart = '';
      for (let i = 0; i < 8; i++) { // Generate 8 random digits
        randomNumberPart += Math.floor(Math.random() * 10);
      }
      const first9Digits = '0' + randomNumberPart;
      const luhnBase = '892700001' + first9Digits; // 19 digits
      const checkDigit = calculateLuhn(luhnBase);
      return `${first9Digits}${checkDigit}`;

    } else { // length === 11
      // Per the validation logic, 11-digit numbers are prefixed with '89270000' to form a 19-digit string for Luhn check.
      let randomNumberPart = '';
      for (let i = 0; i < 10; i++) { // Generate 10 random digits
        randomNumberPart += Math.floor(Math.random() * 10);
      }
      const first10Digits = randomNumberPart;
      const luhnBase = '89270000' + first10Digits; // 18 digits
      const checkDigit = calculateLuhn(luhnBase);
      return `${first10Digits}${checkDigit}`;
    }
  }

  // Handle standard ICCID generation for all other carriers
  if (config.type === 'ICCID') {
    const prefix = config.prefixes[Math.floor(Math.random() * config.prefixes.length)];
    const randomDigitsCount = config.length - prefix.length - 1; // -1 for the checksum digit
    
    let randomNumberPart = '';
    for (let i = 0; i < randomDigitsCount; i++) {
        randomNumberPart += Math.floor(Math.random() * 10);
    }

    const baseSim = `${prefix}${randomNumberPart}`;
    const checksum = calculateLuhn(baseSim);
    return `${baseSim}${checksum}`;
  }
  
  // This fallback should not be reached due to TypeScript's exhaustive checks, but is here as a safeguard.
  return "error-generating";
};


// --- IMEI Generator ---
export const generateImei = (tac: string = ''): string => {
  let baseTac = tac;
  if (!/^\d{8}$/.test(baseTac)) {
    // Generate a random valid-looking TAC
    baseTac = '35' + Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  let serialNumber = '';
  for (let i = 0; i < 6; i++) {
    serialNumber += Math.floor(Math.random() * 10);
  }
  
  const baseImei = `${baseTac}${serialNumber}`;
  const checksum = calculateLuhn(baseImei);
  return `${baseImei}${checksum}`;
};

// --- RSA Phone Number Generator ---
const RSA_MOBILE_PREFIXES = [
    '060', '061', '062', '063', '064', '065', '066', '067', '068', '071', 
    '072', '073', '074', '076', '078', '079', '081', '082', '083', '084'
];

export const generateRsaPhoneNumber = (options: { format: 'Local' | 'International' | 'Random' }): string => {
  const { format } = options;
  const prefix = RSA_MOBILE_PREFIXES[Math.floor(Math.random() * RSA_MOBILE_PREFIXES.length)];
  
  let randomNumberPart = '';
  for (let i = 0; i < 7; i++) {
    randomNumberPart += Math.floor(Math.random() * 10);
  }
  
  const localNumber = `${prefix}${randomNumberPart}`;

  const resolvedFormat = format === 'Random' ? (Math.random() > 0.5 ? 'Local' : 'International') : format;

  if (resolvedFormat === 'International') {
    return `+27${localNumber.substring(1)}`;
  }
  
  return localNumber;
};


// --- RSA Passport Generator ---
export const generateRsaPassport = (): string => {
  const prefix = 'P';
  let randomNumberPart = '';
  for (let i = 0; i < 8; i++) {
    randomNumberPart += Math.floor(Math.random() * 10);
  }
  return `${prefix}${randomNumberPart}`;
};


// --- PDF Exporter ---
export const exportToPdf = (items: string[], barcodeFormat: string, title: string) => {
    const { jsPDF } = jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const canvas = document.createElement('canvas');

    const pageMargin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const barcodeWidth = 75; // Reduced from 80
    const barcodeHeight = 25;
    const textHeight = 5;
    const verticalGap = 10;
    const itemHeight = barcodeHeight + textHeight + verticalGap;
    
    const itemsPerPage = 10;
    const cols = 2;
    
    doc.setFontSize(18);
    doc.text(title, pageWidth / 2, pageMargin, { align: 'center' });
    
    items.forEach((item, index) => {
        const pageNumber = Math.floor(index / itemsPerPage) + 1;
        if (index > 0 && index % itemsPerPage === 0) {
            doc.addPage();
            doc.setFontSize(18);
            doc.text(title, pageWidth / 2, pageMargin, { align: 'center' });
        }
        
        const itemIndexOnPage = index % itemsPerPage;
        const col = itemIndexOnPage % cols;
        const row = Math.floor(itemIndexOnPage / cols);

        const x = pageMargin + col * (pageWidth / 2 - pageMargin * 0.75); // Adjusted spacing
        const y = (pageMargin + 15) + row * itemHeight;

        try {
            JsBarcode(canvas, item, {
                format: barcodeFormat,
                width: 1.8, // Reduced from 2.5
                height: 80,
                displayValue: false,
                margin: 0,
            });
            const barcodeDataUrl = canvas.toDataURL('image/png');
            doc.addImage(barcodeDataUrl, 'PNG', x, y, barcodeWidth, barcodeHeight);
            doc.setFontSize(10);
            doc.text(item, x + barcodeWidth / 2, y + barcodeHeight + textHeight, { align: 'center' });
        } catch (e) {
            console.error(`Could not generate barcode for ${item}`, e);
            doc.setFontSize(10);
            doc.setTextColor(255, 0, 0);
            doc.text(`Error generating barcode for: ${item}`, x, y + barcodeHeight / 2);
            doc.setTextColor(0, 0, 0);
        }
    });

    doc.save(`${title.toLowerCase().replace(/\s/g, '_')}.pdf`);
};