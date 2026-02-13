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
					className='relative border border-gold/20 p-6 md:p-8 rounded-[3rem] shadow-2xl overflow-hidden bg-black/40 backdrop-blur-lg text-center'>
					{/* Ornamental Corners */}
					<div className='absolute top-8 left-8 w-16 h-16 border-gold/30 rounded-tl-2xl opacity-60'></div>
					<div className='absolute top-8 right-8 w-16 h-16 border-gold/30 rounded-tr-2xl opacity-60'></div>
					<div className='absolute bottom-8 left-8 w-16 h-16 border-gold/30 rounded-bl-2xl opacity-60'></div>
					<div className='absolute bottom-8 right-8 w-16 h-16 border-gold/30 rounded-br-2xl opacity-60'></div>

					<motion.h2
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-2xl md:text-3xl font-telugu text-gold drop-shadow-md mb-8 leading-snug'>
						{!isOpen
							? 'Inkokka special gift undi na daggara... idhi box lo kaadu, naa heart lo undi 💖🎁'
							: 'Igo naa special gift... box lo nunchi teesukuni, naa manasu tho neekosam istunna 🎁♾️💖'}
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
								className='cursor-pointer group relative inline-flex flex-col items-center justify-center'>
								<div className='relative'>
									<Gift
										size={120}
										className='text-gold-light relative z-10 drop-shadow-[0_0_25px_rgba(218,165,32,0.8)] group-hover:scale-110 transition-transform duration-300'
									/>
									<div className='absolute inset-0 bg-gold/20 blur-3xl animate-pulse group-hover:bg-gold/40 transition-all duration-500 rounded-full scale-110'></div>
								</div>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setIsOpen(true)}
									className='mt-6 bg-gold hover:bg-gold-light text-maroon font-bold py-2 px-8 rounded-full shadow-lg transition-all animate-bounce flex items-center gap-2 text-sm'>
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
								className='relative bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 p-1 rounded-2xl shadow-[0_0_50px_rgba(255,215,0,0.5)] transform preserve-3d perspective-1000 max-w-sm mx-auto'>
								<div className='bg-maroon/90 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-gold/30 relative overflow-hidden'>
									{/* Shine Effect */}
									<div className='absolute top-0 left-0 w-full h-full py-4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shine pointer-events-none'></div>

									<div className='flex justify-between items-center mb-2 border-b border-gold/30 pb-2 scale-90 md:scale-95'>
										<Ticket className='text-gold w-5 h-5 md:w-6 md:h-6' />
										<span className='font-telugu text-gold-light text-sm md:text-base tracking-widest'>
											GOLDEN TICKET
										</span>
										<Sparkles className='text-gold w-4 h-4 md:w-5 md:h-5 animate-spin-slow' />
									</div>

									<div className='space-y-2 text-center'>
										<h3 className='text-lg md:text-xl font-serif text-cream font-bold leading-tight'>
											Mana kalisi nadiche jeevitha yatra
											ki special ticket 🎫🤩
										</h3>
										<p className='text-gold-light font-telugu text-xs md:text-sm'>
											Valid Forever • Non-Transferable
										</p>
										<div className='border border-dashed border-gold/50 p-2 rounded-lg bg-black/20 mt-2 backdrop-blur-sm'>
											<p className='text-cream font-medium text-xs leading-relaxed drop-shadow-sm'>
												"Ee ticket special power undi...
												unlimited love 💝, hugs 🫂,
												kissess 😘, nee istamaina
												dresses, bangles eppudu demand
												chesina ready👗🛍️... ee
												prapancham lo neku kavalsina
												anni dorukutayi 💞✨"
											</p>
										</div>
									</div>

									<div className='mt-5 flex justify-center'>
										<Link
											to='/love-story'
											className='bg-gold hover:bg-gold-light text-maroon font-bold py-2 px-5 rounded-full text-[10px] md:text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105 cursor-pointer'>
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
