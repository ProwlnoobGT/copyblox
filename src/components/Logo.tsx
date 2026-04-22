
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <motion.div 
        className="w-10 h-10 bg-white flex items-center justify-center rounded-md overflow-hidden relative"
        whileHover={{ rotate: 15, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-transparent to-blox-teal/20"
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="w-2 h-2 bg-black"
          animate={{ 
            scale: [1, 1.5, 1],
            backgroundColor: ['#000', '#8400dc', '#000']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute inset-0 border border-white/0"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(0, 215, 220, 0)",
              "0 0 0 3px rgba(0, 215, 220, 0.3)",
              "0 0 0 0 rgba(0, 215, 220, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
