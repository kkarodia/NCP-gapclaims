import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const PasswordModal = ({ isOpen, onClose, onSubmit, companyName = "NETCARE" }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (password.trim()) {
      onSubmit(password);
      setPassword('');
    }
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-3 rounded-t-lg border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Image
                  src="/assets/images/netcarelogo.png"
                  alt="Netcare Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{companyName}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <div className="mb-6 text-center">
            <h3 className="text-gray-800 font-medium mb-2">Document Information</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A document seems to be password protected, please<br />
              input the document required password
            </p>
          </div>

          <div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent transition-colors"
                placeholder="Enter password"
                autoFocus
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
