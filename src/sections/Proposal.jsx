/** @format */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Vikramasimha from '../Songs/Vikramasimha - Yedemaina Sakhi Video _ A.R. Rahman _ Rajinikanth_ Deepika(MP3_160K).mp3';

const Proposal = ({ onYes }) => {
	const [noCount, setNoCount] = useState(0);
	const [yesPressed, setYesPressed] = useState(false);
	const noButtonRef = useRef(null);
	const navigate = useNavigate();
	const audioRef = useRef(new Audio(Vikramasimha));

	// Cleanup audio on unmount
	React.useEffect(() => {
		const audio = audioRef.current;
		return () => {
			if (audio) {
				audio.pause();
				audio.currentTime = 0;
			}
		};
	}, []);

	const handleNoHover = () => {
		if (noCount < 5) {
			const x = Math.random() * 300 - 150;
			const y = Math.random() * 300 - 150;

			gsap.to(noButtonRef.current, {
				x: x,
				y: y,
				duration: 0.3,
				ease: 'power2.out',
			});

			setNoCount((prev) => prev + 1);
		}
	};

	const handleYesClick = () => {
		setYesPressed(true);
		if (onYes) onYes();

		// Play song immediately
		audioRef.current
			.play()
			.catch((e) => console.log('Audio play failed:', e));

		// Trigger celebration effects
		triggerCelebration();

		// Auto navigate to songs after delay
		setTimeout(() => {
			audioRef.current.pause();
			navigate('/songs');
		}, 6000);
	};

	const triggerCelebration = () => {
		// Create confetti/flowers burst
		const colors = ['#FFD700', '#DC143C', '#FFFDD0']; // Gold, DeepRed, Cream

		for (let i = 0; i < 100; i++) {
			const particle = document.createElement('div');
			particle.classList.add('fixed', 'pointer-events-none', 'z-50');
			particle.style.left = '50%';
			particle.style.top = '50%';
			particle.style.width = Math.random() * 10 + 5 + 'px';
			particle.style.height = Math.random() * 10 + 5 + 'px';
			particle.style.backgroundColor =
				colors[Math.floor(Math.random() * colors.length)];
			particle.style.borderRadius = '50%';

			document.body.appendChild(particle);

			const angle = Math.random() * Math.PI * 2;
			const velocity = Math.random() * 200 + 100;

			gsap.to(particle, {
				x: Math.cos(angle) * velocity * 2,
				y: Math.sin(angle) * velocity * 2,
				opacity: 0,
				duration: Math.random() * 2 + 1,
				ease: 'power2.out',
				onComplete: () => {
					if (particle.parentNode)
						document.body.removeChild(particle);
				},
			});
		}
	};

	return (
		<section
			id='proposal'
			className='w-full h-auto flex flex-col justify-center items-center relative py-6'>
			{/* Ambient Background Glow */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] bg-gold/10 pointer-events-none'></div>

			<div className='z-10 w-full max-w-3xl px-6'>
				<motion.div
					initial={{ scale: 0.9, opacity: 0, y: 15 }}
					whileInView={{ scale: 1, opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative border border-gold/20 p-8 md:p-12 rounded-[3.5rem] shadow-2xl overflow-hidden bg-black/40 backdrop-blur-lg'>
					{/* Ornamental Corners */}
					<div className='absolute top-8 left-8 w-16 h-16 border-t-2 border-l-4 border-gold/30 rounded-tl-2xl opacity-60'></div>
					<div className='absolute top-8 right-8 w-16 h-16 border-t-2 border-r-4 border-gold/30 rounded-tr-2xl opacity-60'></div>
					<div className='absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-2 border-gold/30 rounded-bl-2xl opacity-60'></div>
					<div className='absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-2 border-gold/30 rounded-br-2xl opacity-60'></div>

					<AnimatePresence mode='wait'>
						{!yesPressed ? (
							<motion.div
								key='question'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								className='flex flex-col items-center text-center space-y-8'>
								<div className='relative'>
									<Heart className='w-24 h-24 text-gold fill-maroon drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] animate-pulse' />
									<div className='absolute inset-0 bg-gold/20 blur-xl rounded-full scale-150 animate-pulse'></div>
								</div>

								<div className='space-y-4'>
									<h2 className='text-2xl md:text-4xl font-telugu text-gold drop-shadow-lg leading-tight'>
										Naa Jeevitham Antham Varaku <br />{' '}
										<span className='text-cream text-3xl md:text-5xl'>
											Naa Pakkane Untava?
										</span>
									</h2>
									<p className='text-white/60 font-serif italic text-lg'>
										My heart has been waiting for this
										moment...
									</p>
								</div>

								<div className='flex flex-col md:flex-row gap-5 items-center justify-center w-full mt-5 min-h-[90px] relative'>
									<motion.button
										whileHover={{
											scale: 1.05,
											boxShadow:
												'0 0 25px rgba(220,20,60,0.6)',
										}}
										whileTap={{ scale: 0.95 }}
										onClick={handleYesClick}
										className='bg-gradient-to-r from-deepRed to-maroon text-white font-serif font-bold py-3 px-10 rounded-full text-lg border border-white/10 shadow-lg relative overflow-hidden group'>
										<span className='relative z-10 flex items-center gap-3'>
											<Heart className='fill-current w-6 h-6' />{' '}
											YES, I Will!
										</span>
										<div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
									</motion.button>

									{noCount < 5 && (
										<motion.button
											ref={noButtonRef}
											onMouseEnter={handleNoHover}
											className='bg-white/10 hover:bg-white/20 text-cream/80 hover:text-white font-serif font-medium py-3 px-8 rounded-full text-base border border-white/5 backdrop-blur-md transition-all'
											style={{
												position:
													noCount > 0
														? 'absolute'
														: 'relative',
											}}>
											No, not yet
										</motion.button>
									)}
								</div>
							</motion.div>
						) : (
							<motion.div
								key='celebration'
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ type: 'spring', bounce: 0.5 }}
								className='flex flex-col items-center text-center space-y-6'>
								<motion.div
									animate={{ rotate: [0, 10, -10, 0] }}
									transition={{
										repeat: Infinity,
										duration: 2,
									}}>
									<img
										src='https://emojiisland.com/cdn/shop/products/See_No_Evil_Monkey_Emoji_large.png?v=1571606065'
										alt='Cheeky Monkey'
										className='w-24 h-24 drop-shadow-lg object-contain'
									/>
								</motion.div>

								<h2 className='text-3xl md:text-5xl font-telugu drop-shadow-sm leading-tight'>
									<span className='text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold'>
										Adhi naaku mundhe telusu
									</span>
									<span className='inline-block ml-2 text-white filter-none'>
										🤭💘
									</span>
								</h2>

								<p className='text-xl md:text-2xl text-cream/90 font-serif max-w-lg mx-auto leading-relaxed border-t border-b border-gold/20 py-6'>
									"Every love story is beautiful, but ours is
									my favorite."
								</p>

								<div className='pt-4'>
									<p className='text-xs text-gold/60 uppercase tracking-[0.2em] animate-pulse'>
										Redirecting to our song...
									</p>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</section>
	);
};

export default Proposal;
