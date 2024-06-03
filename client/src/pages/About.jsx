import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <motion.h1 
        className='text-4xl font-bold mb-8 text-slate-800'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Swirl Real Estate
      </motion.h1>
      <motion.p 
        className='mb-6 text-slate-700 text-lg leading-relaxed'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Swirl Real Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
      </motion.p>
      <motion.p 
        className='mb-6 text-slate-700 text-lg leading-relaxed'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
      </motion.p>
      <motion.p 
        className='mb-6 text-slate-700 text-lg leading-relaxed'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
      </motion.p>
    </div>
  );
}
