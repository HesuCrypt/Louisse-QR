import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import maribankQr from '../assets/qr/maribank.png';
import gotymeQr from '../assets/qr/gotyme.png';
import paymayaQr from '../assets/qr/paymaya.png';
import gcashQr from '../assets/qr/gcash.png';

type PaymentMethod = 'Maribank' | 'GoTyme' | 'PayMaya' | 'GCash';

const PAYMENT_METHODS: PaymentMethod[] = ['Maribank', 'GoTyme', 'PayMaya', 'GCash'];

const QR_IMAGES: Record<PaymentMethod, string> = {
  Maribank: maribankQr,
  GoTyme: gotymeQr,
  PayMaya: paymayaQr,
  GCash: gcashQr,
};

const ACCOUNT_NAME = 'Louisse Dominique Bertillo';

export default function App() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [paymentDone, setPaymentDone] = useState(false);

  const handleSelect = (method: PaymentMethod) => {
    setSelectedPayment(method);
    setPaymentDone(false);
  };

  const handleDone = () => {
    setPaymentDone(true);
  };

  const handleReset = () => {
    setSelectedPayment(null);
    setPaymentDone(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center p-6 sm:p-12 overflow-hidden border-8 border-zinc-900 justify-center">
      
      {/* Floating Emoji Header */}
      <motion.div
        animate={{ 
          y: [0, -15, 0], 
          rotate: paymentDone ? [0, 10, -10, 0] : [0, -5, 5, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: paymentDone ? 1 : 2, 
          ease: "easeInOut" 
        }}
        className="text-6xl mb-6 cursor-default select-none"
      >
        {paymentDone ? "😁" : "☺"}
      </motion.div>

      <div className="w-full max-w-2xl relative flex justify-center min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: Payment Selection */}
          {!selectedPayment && !paymentDone && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex flex-col w-full"
            >
              <div className="flex flex-col items-center space-y-4 mb-10">
                <h1 className="text-4xl font-light tracking-widest uppercase text-center">Select Payment Method</h1>
                <p className="text-zinc-500 text-sm tracking-widest uppercase text-center">Choose your preferred bank or wallet</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PAYMENT_METHODS.map((method) => (
                  <motion.button
                    key={method}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(method)}
                    className="flex flex-col items-center justify-center py-6 bg-transparent text-white rounded-xl border border-zinc-800 hover:border-zinc-500 transition-all"
                  >
                    <span className="text-xs font-black uppercase tracking-widest">{method}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STATE 2: QR Code View */}
          {selectedPayment && !paymentDone && (
            <motion.div
              key="qrcode"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }} // Pop effect!
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center w-full"
            >
              <div className="w-full max-w-sm flex items-center justify-between mb-4">
                <button 
                  onClick={handleReset} 
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex flex-col items-center">
                   <p className="text-xs text-zinc-500 uppercase tracking-tighter mb-1">Payment Method</p>
                   <h2 className="text-lg font-medium tracking-widest uppercase">{selectedPayment}</h2>
                </div>
                <div className="w-10"></div> {/* Spacer for perfect centering */}
              </div>

              {/* QR Code */}
              <div className="relative group my-4">
                <div className="absolute -inset-1 bg-gradient-to-b from-zinc-700 to-transparent rounded-3xl blur opacity-25"></div>
                <div className="relative w-72 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-4 shadow-2xl overflow-hidden">
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    src={QR_IMAGES[selectedPayment]}
                    alt={`${selectedPayment} QR code`}
                    className="w-full rounded-lg"
                  />
                  <div className="text-center mt-4 pb-2">
                    <p className="text-xs text-zinc-500 uppercase tracking-tighter mb-1">Account Name</p>
                    <p className="text-sm font-medium uppercase leading-snug">{ACCOUNT_NAME}</p>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-sm flex justify-between items-center border-t border-zinc-900 pt-6 mt-4">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">Secure Encrypted Connection</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDone}
                  className="px-8 py-3 bg-zinc-100 text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white transition-colors"
                >
                  Payment Done
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STATE 3: Thank You / Success */}
          {paymentDone && (
            <motion.div
              key="thankyou"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center"
            >
              <div className="bg-white text-black p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-2 border border-zinc-200">
                <h1 className="font-bold text-lg leading-none uppercase tracking-widest">Thank You!</h1>
                <p className="text-xs opacity-60 uppercase tracking-widest">
                  Payment successful.
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="mt-6 px-8 py-3 bg-transparent text-white border border-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest hover:border-zinc-500 transition-colors"
              >
                Start Over
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
