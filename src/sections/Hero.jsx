/** @format */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section
			id='home'
			className='h-[calc(91vh-7rem)] w-full flex flex-col mt-3 justify-center items-center relative'>
			<div className='absolute inset-0 opacity-20 pointer-events-none'></div>

			<div className='z-10 w-full max-w-3xl px-6'>
				<motion.div
					initial={{ scale: 0.9, opacity: 0, y: 20 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative border border-gold/20 p-8 md:p-12 rounded-[3.5rem] shadow-2xl overflow-hidden bg-black/40 backdrop-blur-lg text-center'>
					{/* Ornamental Corners */}
					<div className='absolute top-8 left-8 w-16 h-16 border-gold/30 rounded-tl-2xl opacity-60'></div>
					<div className='absolute top-8 right-8 w-16 h-16 border-gold/30 rounded-tr-2xl opacity-60'></div>
					<div className='absolute bottom-8 left-8 w-16 h-16  border-gold/30 rounded-bl-2xl opacity-60'></div>
					<div className='absolute bottom-8 right-8 w-16 h-16  border-gold/30 rounded-br-2xl opacity-60'></div>

					<h1 className='font-telugu text-4xl md:text-6xl text-gold mb-8 drop-shadow-lg tracking-wide'>
						Prema Valentine
					</h1>

					<AnimatePresence mode='wait'>
						{!isOpen ? (
							<motion.div
								key='gift'
								initial={{ scale: 0, opacity: 0 }}
								animate={{
									scale: 1,
									opacity: 1,
									rotate: [0, -5, 5, 0],
								}}
								exit={{ scale: 0, opacity: 0, rotate: 180 }}
								transition={{ duration: 0.8, type: 'spring' }}
								className='cursor-pointer mb-4 relative group flex flex-col items-center justify-center'
								onClick={() => setIsOpen(true)}>
								<div className='relative'>
									<Gift
										size={200}
										className='text-gold-light drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] group-hover:scale-110 transition-transform duration-300'
									/>
									<div className='absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-110 animate-pulse'></div>
								</div>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setIsOpen(true)}
									className='mt-8 bg-gold hover:bg-gold-light text-maroon font-bold py-3 px-10 rounded-full shadow-lg transition-all animate-bounce flex items-center gap-2'>
									Tap to Open
								</motion.button>
							</motion.div>
						) : (
							<motion.div
								key='reveal'
								initial={{ scale: 0.5, opacity: 0, y: 50 }}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								transition={{ duration: 0.8, ease: 'easeOut' }}
								className='flex flex-col items-center gap-6'>
								<div className='text-center space-y-4'>
									<motion.h2
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3 }}
										className='font-serif text-3xl md:text-5xl text-gold-light font-bold'>
										Name 1{' '}
										<span className='text-deepRed text-4xl'>
											&
										</span>{' '}
										Name 2
									</motion.h2>
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.6 }}
										className='text-cream/80 font-telugu text-lg italic'>
										A Love Story Written in the Stars
									</motion.p>
								</div>

								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.9, type: 'spring' }}
									className='pt-4'>
									<Link
										to='/golden-ticket'
										className='bg-gradient-to-r from-deepRed to-maroon text-white font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2 cursor-pointer border border-white/10'>
										<Heart className='fill-current w-5 h-5' />
										Open Your Surprise
									</Link>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
