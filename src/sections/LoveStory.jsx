/** @format */

import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
	Calendar,
	MessageCircle,
	Heart,
	Star,
	User,
	Eye,
	Smile,
	Sparkles,
	Home,
} from 'lucide-react';
import { loveStoryEvents } from '../data/loveStory';

const iconMap = {
	Calendar: Calendar,
	MessageCircle: MessageCircle,
	Heart: Heart,
	Star: Star,
	User: User,
	Eye: Eye,
	Smile: Smile,
	Sparkles: Sparkles,
	Home: Home,
};

const LoveStory = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	return (
		<section
			id='love-story'
			ref={containerRef}
			className='min-h-screen w-full py-15 text-cream relative overflow-hidden'>
			{/* Background Pattern */}
			<div
				className='absolute inset-0 opacity-10 pointer-events-none'
				style={{
					backgroundImage:
						'radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)',
					backgroundSize: '40px 40px',
				}}></div>

			{/* Sticky Elegant Header */}
			<div className='sticky top-6 z-50 flex justify-center mb-24'>
				<motion.div
					initial={{ y: -50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className='relative group overflow-hidden rounded-full py-3 px-10 bg-maroon/90 backdrop-blur-md border-2 border-gold/40 shadow-2xl'>
					<div className='absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
					<h2 className='text-4xl md:text-5xl font-telugu text-gold-light flex items-center gap-4 mt-2'>
						<span className='text-2xl mt-2'>✨</span> Our Journey{' '}
						<span className='text-2xl mt-2'>✨</span>
					</h2>
				</motion.div>
			</div>

			<div className='container mx-auto px-4 relative z-10'>
				{/* Central Timeline Line */}
				<div className='absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 bg-gold/20'>
					<motion.div
						style={{ scaleY: scrollYProgress, originY: 0 }}
						className='h-full w-full bg-gold shadow-[0_0_10px_#FFD700]'
					/>
				</div>

				<div className='flex flex-col gap-24 pb-32'>
					{loveStoryEvents.map((event, index) => {
						const Icon = iconMap[event.icon] || Heart;
						const isEven = index % 2 === 0;

						return (
							<div
								key={index}
								className={`flex md:items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} relative`}>
								{/* Timestamp/Date (Desktop) */}
								<div className='hidden md:block w-1/2 px-12 text-center md:text-left'>
									<div
										className={`flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>
										<span className='text-6xl font-serif text-gold/10 font-bold absolute -top-10 select-none'>
											{`0${index + 1}`}
										</span>
										<h4 className='text-gold font-sans font-bold tracking-[0.2em] uppercase text-sm mb-2'>
											{event.date}
										</h4>
									</div>
								</div>

								{/* Center Node */}
								<div className='absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center bg-maroon border-2 border-gold rounded-full z-20 shadow-[0_0_15px_rgba(218,165,32,0.5)]'>
									<Icon
										size={18}
										className='text-gold'
									/>
								</div>

								{/* Content Card */}
								<div
									className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:px-12' : 'md:pl-10 md:pr-12'}`}>
									<motion.div
										initial={{
											opacity: 0,
											x: isEven ? -50 : 50,
										}}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{
											once: true,
											margin: '-10%',
										}}
										transition={{ duration: 0.6 }}
										className='relative group'>
										{/* Ornate Card Design */}
										<div
											className='relative bg-[#3a0a0a] p-8 border border-gold/30 shadow-2xl overflow-hidden
											before:absolute before:inset-0 before:border-[3px] before:border-gold/10 before:scale-95
											hover:before:border-gold/30 hover:before:scale-100 before:transition-all before:duration-500
										'>
											{/* Corner Flourishes */}
											<div className='absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40'></div>
											<div className='absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40'></div>
											<div className='absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40'></div>
											<div className='absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40'></div>

											{/* Mobile Date Display */}
											<div className='md:hidden text-gold/60 text-xs font-bold tracking-widest uppercase mb-2'>
												{event.date}
											</div>

											<h3 className='text-3xl font-serif italic text-gold-light mb-4 group-hover:text-white transition-colors'>
												{event.title}
											</h3>
											<p className='text-cream/80 font-serif text-lg leading-relaxed'>
												{event.description}
											</p>

											{/* Glow Effect */}
											<div className='absolute -bottom-20 -right-20 w-40 h-40 bg-gold/10 blur-[50px] rounded-full group-hover:bg-gold/20 transition-all'></div>
										</div>
									</motion.div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default LoveStory;
