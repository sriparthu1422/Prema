/** @format */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Ticket, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const GoldenTicket = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section
			id='golden-ticket'
			className='h-[calc(91vh-7rem)] w-full flex flex-col mt-3 justify-center items-center relative'>
			<div className='absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay'></div>

			<div className='z-10 w-full max-w-3xl px-6'>
				<motion.div
					initial={{ scale: 0.9, opacity: 0, y: 20 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative border border-gold/20 p-8 md:p-12 rounded-[3.5rem] shadow-2xl overflow-hidden bg-black/40 backdrop-blur-lg text-center'>
					{/* Ornamental Corners */}
					<div className='absolute top-8 left-8 w-16 h-16 border-gold/30 rounded-tl-2xl opacity-60'></div>
					<div className='absolute top-8 right-8 w-16 h-16 border-gold/30 rounded-tr-2xl opacity-60'></div>
					<div className='absolute bottom-8 left-8 w-16 h-16 border-gold/30 rounded-bl-2xl opacity-60'></div>
					<div className='absolute bottom-8 right-8 w-16 h-16 border-gold/30 rounded-br-2xl opacity-60'></div>

					<motion.h2
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-4xl md:text-5xl font-telugu text-gold drop-shadow-md mb-8'>
						Your Special Gift
					</motion.h2>

					<AnimatePresence mode='wait'>
						{!isOpen ? (
							<motion.div
								key='gift-box'
								initial={{ scale: 0.8, opacity: 0 }}
								whileInView={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0, rotate: 180 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
								onClick={() => setIsOpen(true)}
								className='cursor-pointer group relative inline-block flex flex-col items-center justify-center'>
								<div className='relative'>
									<Gift
										size={200}
										className='text-gold-light relative z-10 drop-shadow-[0_0_25px_rgba(218,165,32,0.8)] group-hover:scale-110 transition-transform duration-300'
									/>
									<div className='absolute inset-0 bg-gold/20 blur-3xl animate-pulse group-hover:bg-gold/40 transition-all duration-500 rounded-full scale-110'></div>
								</div>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setIsOpen(true)}
									className='mt-8 bg-gold hover:bg-gold-light text-maroon font-bold py-3 px-10 rounded-full shadow-lg transition-all animate-bounce flex items-center gap-2'>
									Click to Reveal
								</motion.button>
							</motion.div>
						) : (
							<motion.div
								key='ticket'
								initial={{ y: 50, opacity: 0, rotateX: 90 }}
								animate={{ y: 0, opacity: 1, rotateX: 0 }}
								transition={{
									type: 'spring',
									stiffness: 100,
									damping: 20,
									delay: 0.2,
								}}
								className='relative bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 p-1 rounded-2xl shadow-[0_0_50px_rgba(255,215,0,0.5)] transform preserve-3d perspective-1000 max-w-md mx-auto'>
								<div className='bg-maroon/90 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gold/30 relative overflow-hidden'>
									{/* Shine Effect */}
									<div className='absolute top-0 left-0 w-full h-full py-4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shine pointer-events-none'></div>

									<div className='flex justify-between items-center mb-6 border-b border-gold/30 pb-4 scale-90 md:scale-100'>
										<Ticket className='text-gold w-8 h-8 md:w-10 md:h-10' />
										<span className='font-telugu text-gold-light text-lg md:text-xl tracking-widest'>
											GOLDEN TICKET
										</span>
										<Sparkles className='text-gold w-6 h-6 md:w-8 md:h-8 animate-spin-slow' />
									</div>

									<div className='space-y-4 text-center'>
										<h3 className='text-2xl md:text-3xl font-serif text-cream font-bold'>
											A Date With Me
										</h3>
										<p className='text-gold-light font-telugu text-base md:text-lg'>
											Valid Forever • Non-Transferable
										</p>
										<div className='border border-dashed border-gold/40 p-4 rounded-lg bg-black/20 mt-4'>
											<p className='text-cream/80 italic font-serif text-sm md:text-base'>
												"This ticket entitles the bearer
												to unlimited love, hugs, and
												favorite food whenever
												demanded."
											</p>
										</div>
									</div>

									<div className='mt-6 flex justify-center'>
										<Link
											to='/love-story'
											className='bg-gold hover:bg-gold-light text-maroon font-bold py-2 px-6 rounded-full text-xs md:text-sm uppercase tracking-wider shadow-md transition-all hover:scale-105 cursor-pointer'>
											REDEEM ANYTIME
										</Link>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</section>
	);
};

export default GoldenTicket;
