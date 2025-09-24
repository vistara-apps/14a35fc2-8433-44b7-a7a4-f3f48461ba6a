'use client';

import { useState } from 'react';
import { QrCode, Camera, Upload } from 'lucide-react';
import { generateQRCode } from '@/lib/utils';

interface QRScannerFrameProps {
  onScan: (qrData: string) => void;
  variant?: 'simple' | 'instructions';
}

export function QRScannerFrame({ onScan, variant = 'simple' }: QRScannerFrameProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR scan - in real app, this would use camera
    setTimeout(() => {
      const mockQRData = generateQRCode();
      onScan(mockQRData);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualEntry = () => {
    if (manualCode.trim()) {
      onScan(manualCode.trim());
      setManualCode('');
    }
  };

  if (variant === 'instructions') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-fg mb-2">
            Scan Your Plant's QR Code
          </h2>
          <p className="text-text-secondary">
            Find the QR code sticker on your plant pot and scan it to get started
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="aspect-square bg-surface bg-opacity-50 rounded-xl border-2 border-dashed border-white border-opacity-20 flex items-center justify-center mb-4">
            {isScanning ? (
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-text-secondary">Scanning...</p>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="w-12 h-12 text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">Camera view</p>
              </div>
            )}
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="btn-primary w-full mb-4"
          >
            {isScanning ? 'Scanning...' : 'Start Scanning'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white border-opacity-10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-bg px-2 text-text-secondary">or</span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Enter QR code manually"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-white border-opacity-10 rounded-lg text-fg placeholder-text-secondary focus:outline-none focus:border-accent"
            />
            <button
              onClick={handleManualEntry}
              disabled={!manualCode.trim()}
              className="btn-secondary w-full"
            >
              Continue with Code
            </button>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-fg mb-1">Don't have a QR code?</h4>
              <p className="text-sm text-text-secondary">
                You can still add your plant manually. We'll help you identify the species and set up care reminders.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-3 mb-4">
        <QrCode className="w-6 h-6 text-primary" />
        <h3 className="font-semibold text-fg">QR Code Scanner</h3>
      </div>
      
      <div className="aspect-video bg-surface bg-opacity-50 rounded-lg border border-white border-opacity-10 flex items-center justify-center mb-4">
        {isScanning ? (
          <div className="text-center">
            <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-text-secondary">Scanning...</p>
          </div>
        ) : (
          <Camera className="w-8 h-8 text-text-secondary" />
        )}
      </div>
      
      <button
        onClick={handleScan}
        disabled={isScanning}
        className="btn-primary w-full"
      >
        {isScanning ? 'Scanning...' : 'Scan QR Code'}
      </button>
    </div>
  );
}
