
import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard: React.FC<{ to: string; title: string; description: string }> = ({ to, title, description }) => (
  <Link to={to} className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
  </Link>
);

const Home: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to Gen IT</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        A collection of tools to generate valid test data for development and QA purposes. Select a tool to get started.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToolCard 
          to="/barcodes" 
          title="Barcode Generator" 
          description="Convert a list of text values into various barcode formats, ready for preview and PDF export." 
        />
        <ToolCard 
          to="/rsa-id" 
          title="RSA ID Generator" 
          description="Create valid, fake South African ID numbers based on age and gender for testing systems." 
        />
         <ToolCard 
          to="/rsa-passport" 
          title="RSA Passport Generator" 
          description="Generate valid South African passport numbers for testing purposes."
        />
        <ToolCard 
          to="/sim-cards" 
          title="RSA SIM Generator" 
          description="Generate valid ICCID / SIM card numbers for major South African mobile carriers." 
        />
        <ToolCard 
          to="/imei" 
          title="IMEI Generator" 
          description="Produce valid 15-digit IMEI numbers, optionally with a specific Type Allocation Code (TAC)." 
        />
        <ToolCard 
          to="/rsa-phone" 
          title="RSA Phone Number Generator" 
          description="Generate valid South African cellular phone numbers in local or international format." 
        />
      </div>
    </div>
  );
};

export default Home;