/** @format */

import React, { useState, useRef, useEffect } from 'react';
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

const playlist = [
	{
		title: 'Kadalalle',
		artist: 'Dear Comrade',
		src: Kadalalle,
		cover: 'https://images.indianexpress.com/2019/05/dear-comrade-song-kadalalle-759.jpg?w=1200',
	},
	{
		title: 'Neeli Meghamula Lo',
		artist: '35 Chinna Katha Kaadu',
		src: NeeliMeghamula,
		cover: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?q=80&w=400&h=400&auto=format&fit=crop',
	},
	{
		title: 'Nuvvunte Chaley',
		artist: 'Andhra King Taluka',
		src: NuvvunteChaley,
		cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=400&h=400&auto=format&fit=crop',
	},
	{
		title: 'Oh Pilla',
		artist: 'Love Story',
		src: OhPilla,
		cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&h=400&auto=format&fit=crop',
	},
	{
		title: 'Sada Nannu',
		artist: 'Mahanati',
		src: SadaNannu,
		cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&h=400&auto=format&fit=crop',
	},
	{
		title: 'Vikramasimha',
		artist: 'Yedemaina Sakhi',
		src: Vikramasimha,
		cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&h=400&auto=format&fit=crop',
	},
];

const Songs = ({ autoPlay, initialTrackIndex = 0 }) => {
	const [isPlaying, setIsPlaying] = useState(autoPlay);
	const [currentTrack, setCurrentTrack] = useState(initialTrackIndex);
	const [currentTime, setCurrentTime] = useState(0);
	const [volume, setVolume] = useState(0.5);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef(null);

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
	};

	const handlePrev = () => {
		setCurrentTrack(
			(prev) => (prev - 1 + playlist.length) % playlist.length,
		);
	};

	const onTrackEnded = () => {
		handleNext();
	};

	// Update audio src when track changes
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load();
			if (isPlaying) audioRef.current.play();
		}
	}, [currentTrack]);

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
			className='h-auto min-h-[calc(91vh-7rem)] w-full flex flex-col justify-center items-center py-12 relative'>
			{/* Subtle ambient glow */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/25 rounded-full blur-[120px] pointer-events-none'></div>

			<div className='container mx-auto px-6 relative z-10'>
				<motion.div
					initial={{ scale: 0.95, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.8 }}
					className='max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16 bg-[#630a0a]/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden'>
					{/* Vinyl Disc Container */}
					<div className='relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80'>
						<motion.div
							animate={{ rotate: isPlaying ? 360 : 0 }}
							transition={{
								duration: 10,
								repeat: Infinity,
								ease: 'linear',
							}}
							className='w-full h-full rounded-full bg-gradient-to-br from-[#800] to-[#400] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative flex items-center justify-center border-[12px] border-[#500]/50'>
							{/* Groove lines */}
							<div className='absolute inset-2 border-[1px] border-black/10 rounded-full'></div>
							<div className='absolute inset-4 border-[1px] border-black/10 rounded-full'></div>
							<div className='absolute inset-6 border-[1px] border-black/10 rounded-full'></div>
							<div className='absolute inset-8 border-[1px] border-black/10 rounded-full'></div>

							{/* Center Label Area */}
							<div className='w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#111] border-4 border-[#222] relative overflow-hidden flex items-center justify-center'>
								{/* Center Hole */}
								<div className='w-4 h-4 bg-gold/50 rounded-full z-10'></div>
							</div>
						</motion.div>
					</div>

					{/* Player Info & Controls */}
					<div className='flex-grow w-full space-y-10'>
						<div className='text-center lg:text-left space-y-2'>
							<h2 className='text-4xl md:text-5xl font-telugu text-gold-light drop-shadow-lg tracking-wide'>
								{playlist[currentTrack].title}
							</h2>
							<p className='text-cream/70 font-serif text-xl italic'>
								{playlist[currentTrack].artist}
							</p>
						</div>

						{/* Seeker Section */}
						<div className='space-y-3'>
							<input
								type='range'
								min='0'
								max={duration || 0}
								value={currentTime}
								onChange={handleSeek}
								className='w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-gold-light'
							/>
							<div className='flex justify-between text-sm text-cream/40 font-mono'>
								<span>{formatTime(currentTime)}</span>
								<span>{formatTime(duration)}</span>
							</div>
						</div>

						{/* Control Buttons */}
						<div className='flex justify-center lg:justify-start items-center gap-8'>
							<button
								onClick={handlePrev}
								className='text-white/40 hover:text-gold-light transition-colors hover:scale-110 transform cursor-pointer'>
								<SkipBack size={36} />
							</button>

							<button
								onClick={togglePlay}
								className='w-20 h-20 md:w-24 md:h-24 bg-gold hover:bg-gold-light text-maroon rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-[0_0_25px_rgba(218,165,32,0.5)] cursor-pointer'>
								{isPlaying ? (
									<Pause
										size={40}
										fill='currentColor'
									/>
								) : (
									<Play
										size={40}
										fill='currentColor'
										className='translate-x-1'
									/>
								)}
							</button>

							<button
								onClick={handleNext}
								className='text-white/40 hover:text-gold-light transition-colors hover:scale-110 transform cursor-pointer'>
								<SkipForward size={36} />
							</button>
						</div>

						{/* Volume Section */}
						<div className='flex items-center gap-4 max-w-[200px] mx-auto lg:mx-0 opacity-60 hover:opacity-100 transition-opacity'>
							<Volume2
								size={20}
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
