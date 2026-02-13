/** @format */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Play,
	Pause,
	SkipBack,
	SkipForward,
	Volume2,
	VolumeX,
	Heart,
} from 'lucide-react';

import Kadalalle from '../Songs/Kadalalle Video Song _ Dear Comrade Telugu _ Vijay Deverakonda _ Rashmika _ Bharat Kamma(MP3_160K).mp3';
import NeeliMeghamula from '../Songs/Neeli Meghamula lo Full Video Song _ 35 Chinna Katha Kaadu _ Vishwadev_Nivetha Thomas_Vivek Sagar(MP3_160K).mp3';
import NuvvunteChaley from '../Songs/Nuvvunte Chaley - Lyrical _ Andhra King Taluka _ Ram Pothineni _ Bhagyashri Borse _ Mahesh Babu P(MP3_160K).mp3';
import OhPilla from '../Songs/Oh Pilla(MP3_160K).mp3';
import SadaNannu from '../Songs/Sada Nannu Lyrical _ Mahanati Songs _ Keerthy Suresh _ Dulquer _ Samantha _ Vijay Devarakonda(MP3_160K).mp3';
import Vikramasimha from '../Songs/Vikramasimha - Yedemaina Sakhi Video _ A.R. Rahman _ Rajinikanth_ Deepika(MP3_160K).mp3';
import YedemainaSakhiCover from '../Songs/images/8..jpg';
import SadaNannuCover from '../Songs/images/10.jpg';
import NeeliMeghamulaCover from '../Songs/images/6..jpg';
import OhPillaCover from '../Songs/images/1.jpg';
import KadalalleCover from '../Songs/images/9..jpg';
import NuvvunteChaleyCover from '../Songs/images/5.jpg';

const playlist = [
	{
		title: 'Yedemaina Sakhi',
		artist: 'Vikramasimha',
		src: Vikramasimha,
		cover: YedemainaSakhiCover,
	},
	{
		title: 'Sada Nannu',
		artist: 'Mahanati',
		src: SadaNannu,
		cover: SadaNannuCover,
	},
	{
		title: 'Neeli Meghamula Lo',
		artist: '35 Chinna Katha Kaadu',
		src: NeeliMeghamula,
		cover: NeeliMeghamulaCover,
		position: 'object-top',
	},
	{
		title: 'Oh Pilla',
		artist: 'Love Story',
		src: OhPilla,
		cover: OhPillaCover,
	},
	{
		title: 'Kadalalle',
		artist: 'Dear Comrade',
		src: Kadalalle,
		cover: KadalalleCover,
		position: 'object-center',
	},
	{
		title: 'Nuvvunte Chaley',
		artist: 'Andhra King Taluka',
		src: NuvvunteChaley,
		cover: NuvvunteChaleyCover,
	},
];

const Songs = ({ autoPlay, initialTrackIndex = 0 }) => {
	const [isPlaying, setIsPlaying] = useState(autoPlay);
	const [currentTrack, setCurrentTrack] = useState(initialTrackIndex);
	const [currentTime, setCurrentTime] = useState(0);
	const [volume, setVolume] = useState(0.5);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef(null);
	const navigate = useNavigate();

	// Attempt to play on mount/autoPlay change
	useEffect(() => {
		if (autoPlay && audioRef.current) {
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise
					.then(() => setIsPlaying(true))
					.catch((error) => {
						console.log('Playback failed:', error);
						setIsPlaying(false);
					});
			}
		}
	}, [autoPlay]);

	const togglePlay = () => {
		if (audioRef.current.paused) {
			audioRef.current.play();
			setIsPlaying(true);
		} else {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};

	const handleNext = () => {
		setCurrentTrack((prev) => (prev + 1) % playlist.length);
		setIsPlaying(true);
	};

	const handlePrev = () => {
		setCurrentTrack(
			(prev) => (prev - 1 + playlist.length) % playlist.length,
		);
		setIsPlaying(true);
	};

	const onTrackEnded = () => {
		handleNext();
	};

	const lastTrackRef = useRef(currentTrack);

	// Update audio src when track changes
	useEffect(() => {
		if (audioRef.current) {
			if (lastTrackRef.current !== currentTrack) {
				audioRef.current.load();
				lastTrackRef.current = currentTrack;
			}
			if (isPlaying) {
				audioRef.current
					.play()
					.catch((e) => console.log('Playback failed:', e));
			}
		}
	}, [currentTrack, isPlaying]);

	// Update duration and current time
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const setAudioData = () => {
			setDuration(audio.duration);
		};

		const setAudioTime = () => {
			setCurrentTime(audio.currentTime);
		};

		audio.addEventListener('loadeddata', setAudioData);
		audio.addEventListener('timeupdate', setAudioTime);

		return () => {
			audio.removeEventListener('loadeddata', setAudioData);
			audio.removeEventListener('timeupdate', setAudioTime);
		};
	}, []);

	// Handle seeking
	const handleSeek = (e) => {
		const time = parseFloat(e.target.value);
		setCurrentTime(time);
		audioRef.current.currentTime = time;
	};

	// Format time
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	// Update volume
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
		}
	}, [volume]);

	return (
		<section
			id='songs'
			className='w-full h-[calc(90vh-7rem)] flex flex-col justify-center items-center relative overflow-hidden'>
			{/* Subtle ambient glow */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/25 rounded-full blur-[120px] pointer-events-none'></div>

			<div className='container mx-auto px-4 relative z-10 h-full flex items-center justify-center'>
				<motion.div
					initial={{ scale: 0.95, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.8 }}
					className='w-full max-w-4xl flex flex-col lg:flex-row items-center gap-4 lg:gap-12 bg-[#630a0a]/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden max-h-full'>
					{/* Vinyl Disc Container */}
					<div className='relative flex-shrink-0 w-40 h-40 md:w-72 md:h-72 lg:w-80 lg:h-80'>
						<motion.div
							animate={{ rotate: isPlaying ? 360 : 0 }}
							transition={{
								duration: 10,
								repeat: Infinity,
								ease: 'linear',
							}}
							className='w-full h-full rounded-full bg-gradient-to-br from-[#800] to-[#400] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative flex items-center justify-center border-[6px] md:border-[10px] border-[#500]/50'>
							{/* Groove lines */}
							<div className='absolute inset-2 border-[1px] border-black/10 rounded-full'></div>
							<div className='absolute inset-4 border-[1px] border-black/10 rounded-full'></div>
							<div className='absolute inset-6 border-[1px] border-black/10 rounded-full'></div>
							<div className='absolute inset-8 border-[1px] border-black/10 rounded-full'></div>

							{/* Center Label Area */}
							<div className='w-14 h-14 md:w-28 md:h-28 rounded-full bg-[#111] border-4 border-[#222] relative overflow-hidden flex items-center justify-center'>
								<img
									src={playlist[currentTrack].cover}
									alt='Album Art'
									className={`w-full h-full ${
										playlist[currentTrack].fit ||
										'object-cover'
									} ${
										playlist[currentTrack].position ||
										'object-center'
									}`}
									style={playlist[currentTrack].style}
								/>
								{/* Center Hole */}
								<div className='absolute w-2 h-2 md:w-4 md:h-4 bg-black rounded-full z-10 border-2 border-gold/30'></div>
							</div>
						</motion.div>
					</div>

					{/* Player Info & Controls */}
					<div className='flex-grow w-full space-y-4 md:space-y-6 flex flex-col justify-center'>
						<div className='text-center lg:text-left space-y-1 mt-2'>
							<h2
								className={`${
									playlist[currentTrack].title ===
									'Neeli Meghamula Lo'
										? 'text-xl md:text-3xl'
										: 'text-2xl md:text-4xl'
								} font-telugu text-gold-light drop-shadow-lg tracking-wide leading-snug`}>
								{playlist[currentTrack].title}
							</h2>
							<p className='text-cream/70 font-serif text-base md:text-lg italic'>
								{playlist[currentTrack].artist}
							</p>
						</div>

						{/* Seeker Section */}
						<div className='space-y-2 w-full'>
							<input
								type='range'
								min='0'
								max={duration || 0}
								value={currentTime}
								onChange={handleSeek}
								className='w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-gold-light'
							/>
							<div className='flex justify-between text-xs md:text-sm text-cream/40 font-mono'>
								<span>{formatTime(currentTime)}</span>
								<span>{formatTime(duration)}</span>
							</div>
						</div>

						{/* Control Buttons */}
						<div className='flex justify-center lg:justify-start items-center gap-6 md:gap-8'>
							<button
								onClick={handlePrev}
								className='text-white/40 hover:text-gold-light transition-colors hover:scale-110 transform cursor-pointer'>
								<SkipBack
									size={28}
									className='md:w-9 md:h-9'
								/>
							</button>

							<button
								onClick={togglePlay}
								className='w-16 h-16 md:w-20 md:h-20 bg-gold hover:bg-gold-light text-maroon rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-[0_0_25px_rgba(218,165,32,0.5)] cursor-pointer'>
								{isPlaying ? (
									<Pause
										size={32}
										className='md:w-10 md:h-10'
										fill='currentColor'
									/>
								) : (
									<Play
										size={32}
										className='md:w-10 md:h-10 translate-x-1'
										fill='currentColor'
									/>
								)}
							</button>

							<button
								onClick={handleNext}
								className='text-white/40 hover:text-gold-light transition-colors hover:scale-110 transform cursor-pointer'>
								<SkipForward
									size={28}
									className='md:w-9 md:h-9'
								/>
							</button>
						</div>

						{/* Volume Section */}
						<div className='flex items-center gap-3 max-w-[150px] mx-auto lg:mx-0 opacity-60 hover:opacity-100 transition-opacity'>
							<Volume2
								size={18}
								className='text-white/50'
							/>
							<input
								type='range'
								min='0'
								max='1'
								step='0.01'
								value={volume}
								onChange={(e) =>
									setVolume(parseFloat(e.target.value))
								}
								className='w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold/60'
							/>
						</div>

						{/* Navigate to Final Wish - Only for Nuvvunte Chaley */}
						{playlist[currentTrack].title === 'Nuvvunte Chaley' && (
							<div className='absolute bottom-6 right-6 lg:bottom-10 lg:right-10'>
								<motion.button
									initial={{ scale: 0, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{
										type: 'spring',
										stiffness: 200,
									}}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={() => {
										setIsPlaying(false);
										audioRef.current.pause();
										navigate('/wishes');
									}}
									className='flex items-center gap-2 bg-gold hover:bg-gold-light text-maroon font-bold py-2 px-6 rounded-full shadow-lg transition-all animate-bounce'>
									<span>Final Gift</span>
									<Heart
										size={20}
										fill='currentColor'
									/>
								</motion.button>
							</div>
						)}
					</div>
				</motion.div>
			</div>

			<audio
				ref={audioRef}
				src={playlist[currentTrack].src}
				onEnded={onTrackEnded}
			/>
		</section>
	);
};

export default Songs;
