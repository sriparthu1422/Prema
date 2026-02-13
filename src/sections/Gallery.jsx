/** @format */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Maximize2 } from 'lucide-react';

import Img1 from '../Songs/images/1.jpg';
import Img2 from '../Songs/images/2..jpg';
import Img3 from '../Songs/images/3..jpg';
import Img4 from '../Songs/images/4.jpg';
import Img5 from '../Songs/images/5.jpg';
import Img6 from '../Songs/images/6..jpg';
import Img7 from '../Songs/images/7..jpg';
import Img8 from '../Songs/images/8..jpg';
import Img9 from '../Songs/images/9..jpg';
import Img10 from '../Songs/images/10.jpg';

const Gallery = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	// Local Images from Songs/images folder
	const galleryImages = [
		Img1,
		Img2,
		Img3,
		Img4,
		Img5,
		Img6,
		Img7,
		Img8,
		Img9,
		Img10,
	];

	return (
		<section
			id='gallery'
			className='h-[calc(91vh-7rem)] w-full py-10 relative overflow-y-auto scrollbar-hide flex flex-col items-center mt-3'>
			{/* Royal Background Texture */}
			<div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] mix-blend-overlay"></div>

			<div className='container mx-auto px-4 z-10'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-10'>
					<h2 className='text-4xl md:text-5xl font-telugu text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-3'>
						Mana Sweet Memories 💖
					</h2>
					<p className='text-cream/80 font-serif italic text-sm md:text-base'>
						"Prathi kshanam nee tho oka beautiful painting
						laantidi..."
					</p>
				</motion.div>

				{/* Uniform Vertical Grid Layout (9:16) */}
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mx-auto max-w-7xl pb-10'>
					{galleryImages.map((src, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
							whileHover={{ scale: 1.05, zIndex: 10 }}
							onClick={() => setSelectedImage(src)}
							className='relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-gold/20 bg-black aspect-[9/16]'>
							<div className='w-full h-full relative'>
								<img
									src={src}
									alt={`Memory ${index + 1}`}
									loading='lazy'
									className='w-full h-full object-cover transition-all duration-700 filter sepia-[0.3] group-hover:sepia-0 group-hover:scale-110'
								/>

								{/* Gold Frame Overlay (Visible on Hover) */}
								<div className='absolute inset-0 border-[3px] border-gold/0 group-hover:border-gold/80 transition-all duration-300 rounded-xl'></div>

								{/* Gradient Overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-maroon/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

								{/* Icon */}
								<div className='absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0'>
									<div className='bg-gold/90 p-2 rounded-full text-maroon shadow-lg'>
										<Maximize2 size={14} />
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Fullscreen Lightbox */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-maroon/95 backdrop-blur-xl p-4'
						onClick={() => setSelectedImage(null)}>
						{/* Close Button */}
						<button
							className='absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-50 group'
							onClick={() => setSelectedImage(null)}>
							<X
								size={32}
								className='group-hover:rotate-90 transition-transform duration-300'
							/>
						</button>

						<motion.div
							layoutId={`image-${selectedImage}`}
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className='relative max-w-5xl max-h-[90vh] rounded-lg overflow-hidden shadow-[0_0_50px_rgba(218,165,32,0.3)] border border-gold/20'
							onClick={(e) => e.stopPropagation()}>
							<img
								src={selectedImage}
								alt='Selected Memory'
								className='max-w-full max-h-[90vh] object-contain'
							/>
							<div className='absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent'>
								<p className='text-gold font-telugu text-lg text-center'>
									Precious Moment ❤️
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default Gallery;
