import React, { useState } from 'react';
import { X, Phone, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, lang = 'en' }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1); // 1: phone, 2: OTP, 3: success
  const [otp, setOtp] = useState(['', '', '', '']);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setStep(2);
    }
  };

  const handleOtpChange = (index, val) => {
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const verifyOtp = () => {
    setStep(3);
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-bg-card rounded-2xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-border-subtle relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-text-meta hover:text-text-heading hover:bg-bg-sand transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-xl bg-brand-terracotta flex items-center justify-center text-white font-heading font-bold text-sm">
            ந
          </span>
          <span className="font-heading font-extrabold text-lg text-text-heading">
            NammaOor<span className="text-brand-terracotta">.life</span>
          </span>
        </div>

        {step === 1 && (
          <div>
            <h3 className="font-heading font-bold text-xl text-text-heading mb-1">
              Welcome to NammaOor
            </h3>
            <p className="text-xs text-text-meta mb-5 leading-relaxed">
              Login with your mobile number to vote, save your favorite local spots, and claim business listings.
            </p>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-heading mb-1.5">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-semibold text-text-body">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-border-subtle bg-bg-primary text-xs sm:text-sm text-text-heading outline-none focus:border-brand-terracotta"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-brand-terracotta text-white font-semibold text-xs tracking-wide shadow-button hover:bg-brand-terracotta-dark transition-colors"
              >
                Get Verification Code →
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-heading font-bold text-xl text-text-heading mb-1">
              Enter 4-Digit Code
            </h3>
            <p className="text-xs text-text-meta mb-5">
              Code sent to +91 {phoneNumber}
            </p>

            <div className="flex justify-between gap-2 mb-5">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-12 text-center font-display font-bold text-lg rounded-xl border border-border-subtle bg-bg-primary text-text-heading outline-none focus:border-brand-terracotta"
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              className="w-full py-3 rounded-full bg-brand-forest text-white font-semibold text-xs tracking-wide shadow-sm hover:opacity-95 transition-opacity"
            >
              Verify & Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-brand-forest/10 text-brand-forest flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="font-heading font-semibold text-lg text-text-heading">
              Logged in successfully!
            </h4>
            <p className="text-xs text-text-meta mt-1">
              Vanakkam! Welcome to Tirunelveli oor hub.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
