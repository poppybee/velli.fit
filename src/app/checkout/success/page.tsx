import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'next/link';

export default function SuccessPage() {
  return (
    <main className="h-screen flex items-center justify-center bg-white p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle size={48} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black tracking-tighter mb-4 text-black"
        >
          Payment Successful!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 font-medium mb-12"
        >
          Your order has been placed successfully. You will receive a confirmation email shortly with your tracking details.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Link
            href="/"
            className="w-full h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 transition-colors text-center"
          >
            Back to Home
          </Link>
          <button className="w-full h-14 bg-gray-50 text-gray-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
            Order Details
          </button>
        </motion.div>
      </div>
    </main>
  );
}
