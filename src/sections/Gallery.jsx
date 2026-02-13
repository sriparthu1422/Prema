/** @format */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const images = [
	'https://picsum.photos/id/1015/600/400',
	'https://picsum.photos/id/1016/400/600',
	'https://picsum.photos/id/1018/600/400',
	'https://picsum.photos/id/1019/400/600',
	'https://picsum.photos/id/1020/600/400',
	'https://picsum.photos/id/1021/400/600',
];

const Gallery = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	return (
		<section
			id='gallery'
			className='h-[calc(91vh-7rem)] w-full py-8 mt-3 overflow-y-auto scrollbar-hide bg-transparent relative'>
			{/* Decorative floral texture overlay (subtle) */}
			<div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/flowers.png')]"></div>

			<div className='container mx-auto px-4 relative z-10'>
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-4xl md:text-5xl font-telugu text-gold text-center mb-12 drop-shadow-md'>
					Memorable Moments
				</motion.h2>

				<div className='columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'>
					{images.map((src, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{
								y: -10,
								rotate: index % 2 === 0 ? 2 : -2,
							}}
							onClick={() => setSelectedImage(src)}
							className='break-inside-avoid relative group cursor-pointer rounded-lg p-2 bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/40 shadow-xl backdrop-blur-sm'>
							<div className='overflow-hidden rounded-md border border-gold/20'>
								<img
									src={src}
									alt={`Memory ${index + 1}`}
									loading='lazy'
									className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110'
								/>
							</div>
							<div className='absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg'>
								<ZoomIn className='text-gold w-10 h-10 drop-shadow-lg scale-0 group-hover:scale-110 transition-transform duration-300 delay-100' />
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Lightbox Modal */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-maroon/95 backdrop-blur-xl p-4'
						onClick={() => setSelectedImage(null)}>
						<motion.div
							initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
							animate={{ scale: 1, opacity: 1, rotateX: 0 }}
							exit={{ scale: 0.8, opacity: 0, rotateX: -15 }}
							className='relative max-w-5xl max-h-[90vh] p-2 bg-gradient-to-br from-gold to-yellow-600 rounded-lg shadow-2xl'
							onClick={(e) => e.stopPropagation()}>
							<div className='bg-black rounded-lg overflow-hidden'>
								<img
									src={selectedImage}
									alt='Selected Memory'
									className='max-w-full max-h-[85vh] object-contain'
								/>
							</div>
							<button
								className='absolute -top-4 -right-4 text-maroon bg-gold hover:bg-white rounded-full p-2 transition-all shadow-lg hover:rotate-90'
								onClick={() => setSelectedImage(null)}>
								<X size={24} />
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default Gallery;
