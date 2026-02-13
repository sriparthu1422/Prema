/** @format */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Stars } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SadaNannu from '../Songs/Sada Nannu Lyrical _ Mahanati Songs _ Keerthy Suresh _ Dulquer _ Samantha _ Vijay Devarakonda(MP3_160K).mp3';

const ValentineWishes = () => {
	const navigate = useNavigate();
	const audioRef = React.useRef(new Audio(SadaNannu));

	React.useEffect(() => {
		const audio = audioRef.current;
		audio.play().catch((e) => console.log('Audio play failed:', e));
		return () => {
			audio.pause();
			audio.currentTime = 0;
		};
	}, []);

	return (
		<section className='fixed inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden bg-maroon z-50'>
			{/* Ambient Background Glow */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] bg-gold/10 pointer-events-none'></div>

			{/* Floating Gold Dust */}
			{[...Array(20)].map((_, i) => (
				<motion.div
					key={i}
					initial={{
						y: '100vh',
						x: Math.random() * 100 + 'vw',
						opacity: 0,
					}}
					animate={{
						y: '-10vh',
						opacity: [0, 0.5, 0],
						scale: [0.5, 1, 0.5],
					}}
					transition={{
						duration: Math.random() * 15 + 10,
						repeat: Infinity,
						ease: 'linear',
						delay: Math.random() * 5,
					}}
					className='absolute w-1 h-1 bg-gold/40 rounded-full blur-[1px] pointer-events-none'
				/>
			))}

			<div className='z-10 w-full max-w-xl px-4'>
				<motion.div
					initial={{ scale: 0.9, opacity: 0, y: 15 }}
					whileInView={{ scale: 1, opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative border border-gold/20 p-6 md:p-8 rounded-[2.5rem] shadow-2xl overflow-hidden bg-black/40 backdrop-blur-lg flex flex-col items-center text-center space-y-6'>
					{/* Ornamental Corners */}
					<div className='absolute top-8 left-8 w-16 h-16 border-t-2 border-l-4 border-gold/30 rounded-tl-2xl opacity-60'></div>
					<div className='absolute top-8 right-8 w-16 h-16 border-t-2 border-r-4 border-gold/30 rounded-tr-2xl opacity-60'></div>
					<div className='absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-2 border-gold/30 rounded-bl-2xl opacity-60'></div>
					<div className='absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-2 border-gold/30 rounded-br-2xl opacity-60'></div>

					{/* Heart Icon */}
					<div className='relative'>
						<Heart className='w-16 h-16 text-gold fill-maroon drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] animate-pulse' />
						<div className='absolute inset-0 bg-gold/20 blur-xl rounded-full scale-125 animate-pulse'></div>
					</div>

					{/* Main Text */}
					<div className='space-y-2'>
						<h1 className='text-3xl md:text-5xl font-sacramento text-gold drop-shadow-[0_0_10px_rgba(218,165,32,0.8)] leading-tight'>
							Happy Valentine's Day
						</h1>
						<h2 className='text-xl md:text-3xl font-telugu text-cream drop-shadow-lg'>
							To My Bujji Kanna ❤️
						</h2>
					</div>

					{/* Message */}
					<div className='py-3 border-t border-b border-gold/10 w-full max-w-sm'>
						<p className='text-white/80 font-serif italic text-base md:text-lg leading-relaxed'>
							"Nuvvu naa life lo unnantha varaku, prathi roju
							Valentine's Day ne. <br />
							<span className='text-gold font-bold mt-2 block'>
								I love you forever! ♾️💖
							</span>
							"
						</p>
					</div>

					{/* Back Button */}
					<motion.button
						whileHover={{
							scale: 1.05,
							boxShadow: '0 0 25px rgba(220,20,60,0.6)',
						}}
						whileTap={{ scale: 0.95 }}
						onClick={() => navigate('/')}
						className='bg-gradient-to-r from-deepRed to-maroon text-white font-serif font-bold py-3 px-10 rounded-full text-lg border border-white/10 shadow-lg relative overflow-hidden group mt-4'>
						<span className='relative z-10 flex items-center gap-3'>
							<Heart className='fill-current w-5 h-5' /> Back to
							Home
						</span>
						<div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
};

export default ValentineWishes;
