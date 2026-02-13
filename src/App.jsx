/** @format */

import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import FlowerRain from './components/FlowerRain';
import ScrollToTop from './components/ScrollToTop';
import Hero from './sections/Hero';
import GoldenTicket from './sections/GoldenTicket';
import LoveStory from './sections/LoveStory';
import Gallery from './sections/Gallery';
import Proposal from './sections/Proposal';
import Songs from './sections/Songs';
import ValentineWishes from './sections/ValentineWishes';

const AnimatedRoutes = () => {
	const location = useLocation();
	const [playMusic, setPlayMusic] = useState(false);
	const [initialTrack, setInitialTrack] = useState(0);

	const handleProposalYes = () => {
		setPlayMusic(true);
		setInitialTrack(0); // Index for 'Yedemaina Sakhi'
	};

	return (
		<AnimatePresence mode='wait'>
			<Routes
				location={location}
				key={location.pathname}>
				<Route
					path='/'
					element={
						<PageWrapper>
							<Hero />
						</PageWrapper>
					}
				/>
				<Route
					path='/golden-ticket'
					element={
						<PageWrapper>
							<GoldenTicket />
						</PageWrapper>
					}
				/>
				<Route
					path='/love-story'
					element={
						<PageWrapper>
							<LoveStory />
						</PageWrapper>
					}
				/>
				<Route
					path='/gallery'
					element={
						<PageWrapper>
							<Gallery />
						</PageWrapper>
					}
				/>
				<Route
					path='/proposal'
					element={
						<PageWrapper>
							<Proposal onYes={handleProposalYes} />
						</PageWrapper>
					}
				/>
				<Route
					path='/songs'
					element={
						<PageWrapper>
							<Songs
								autoPlay={playMusic}
								initialTrackIndex={initialTrack}
							/>
						</PageWrapper>
					}
				/>
				<Route
					path='/wishes'
					element={
						<PageWrapper>
							<ValentineWishes />
						</PageWrapper>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
};

// Simplified animation (fade only) to reduce distraction
const PageWrapper = ({ children }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ duration: 0.4 }}
		className='min-h-screen w-full pt-28 px-4 md:px-8 pb-12 flex flex-col items-center relative overflow-hidden'>
		<div className='w-full max-w-7xl mx-auto'>{children}</div>
	</motion.div>
);

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Router>
			<ScrollToTop /> {/* Reset scroll on route change */}
			<div className='bg-maroon min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-maroon'>
				<AnimatePresence>
					{loading ? (
						<motion.div
							key='loader'
							initial={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-maroon'>
							<div className='relative'>
								<div className='w-24 h-24 border-4 border-gold rounded-full animate-spin-slow border-t-transparent'></div>
								<div className='absolute inset-0 flex items-center justify-center text-3xl'>
									🌹
								</div>
							</div>
							<p className='mt-4 text-gold font-telugu text-xl animate-pulse'>
								Loading Love...
							</p>
						</motion.div>
					) : (
						<>
							<Navbar />
							<FlowerRain />
							<AnimatedRoutes />
						</>
					)}
				</AnimatePresence>
			</div>
		</Router>
	);
}

export default App;
