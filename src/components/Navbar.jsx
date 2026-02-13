/** @format */

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navLinks = [
		{ name: 'Home', to: '/' },
		{ name: 'Golden Ticket', to: '/golden-ticket' },
		{ name: 'Love Story', to: '/love-story' },
		{ name: 'Gallery', to: '/gallery' },
		{ name: 'Proposal', to: '/proposal' },
		{ name: 'Songs', to: '/songs' },
	];

	return (
		<nav className='fixed top-0 left-0 w-full z-50 bg-maroon/80 backdrop-blur-md border-b border-gold/30 shadow-lg h-20 flex items-center transition-all duration-300'>
			<div className='container mx-auto px-6 flex justify-between items-center w-full'>
				{/* Logo */}
				<Link
					to='/'
					className='text-gold-light font-serif text-2xl font-bold flex items-center gap-2 cursor-pointer'>
					<Heart className='w-6 h-6 text-deepRed fill-current animate-pulse' />
					<span>RakshithaParthu</span>
				</Link>

				{/* Desktop Menu */}
				<div className='hidden md:flex gap-8 items-center'>
					{navLinks.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							className={({ isActive }) =>
								`text-cream font-serif hover:text-gold transition-colors cursor-pointer text-lg tracking-wide relative group ${isActive
									? 'text-gold border-b-2 border-gold'
									: ''
								}`
							}>
							{link.name}
							<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full'></span>
						</NavLink>
					))}
				</div>

				{/* Mobile Menu Button */}
				<button
					className='md:hidden text-gold hover:text-white transition-colors'
					onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='md:hidden absolute top-full left-0 w-full bg-maroon/95 backdrop-blur-lg border-t border-gold/20 h-screen'>
						<div className='flex flex-col p-6 gap-6 items-center pt-24'>
							{navLinks.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									onClick={() => setIsOpen(false)}
									className={({ isActive }) =>
										`text-cream font-serif text-2xl hover:text-gold transition-colors cursor-pointer ${isActive
											? 'text-gold underline decoration-gold decoration-2 underline-offset-8'
											: ''
										}`
									}>
									{link.name}
								</NavLink>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
