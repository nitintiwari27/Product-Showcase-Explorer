import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorMessage = ({ 
  title = 'Something went wrong', 
  message, 
  onRetry, 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4"
      >
        <AlertCircle className="w-8 h-8 text-red-600" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      
      {message && (
        <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      )}
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;

