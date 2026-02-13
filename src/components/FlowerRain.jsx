/** @format */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FlowerRain = () => {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const createFlower = () => {
			const flower = document.createElement('div');
			// Randomly choose between a petal and a marigold (simplified as circle/shape)
			const isMarigold = Math.random() > 0.7;

			flower.classList.add('absolute', 'pointer-events-none');

			if (isMarigold) {
				flower.innerHTML = '🌼'; // Fallback to emoji for reliability and visual clarity without assets
				flower.style.fontSize = `${Math.random() * 20 + 20}px`;
			} else {
				flower.innerHTML = '🌹'; // Rose or petal
				flower.style.fontSize = `${Math.random() * 15 + 10}px`;
			}

			// Random starting position
			const startX = Math.random() * window.innerWidth;
			flower.style.left = `${startX}px`;
			flower.style.top = '-50px';
			flower.style.opacity = '0.8'; // Start slightly transparent

			container.appendChild(flower);

			// Animate fall
			gsap.to(flower, {
				y: window.innerHeight + 100,
				x: startX + (Math.random() * 100 - 50),
				rotation: Math.random() * 360,
				opacity: 0,
				duration: Math.random() * 5 + 5,
				ease: 'none',
				onComplete: () => {
					if (flower.parentNode) container.removeChild(flower);
				},
			});
		};

		const interval = setInterval(createFlower, 300); // Create a flower every 300ms

		return () => {
			clearInterval(interval);
			// Clean up flowers? GSAP handles removal on complete, but we should clear container on unmount if needed
			if (container) container.innerHTML = '';
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className='fixed top-0 left-0 w-full h-full pointer-events-none z-40 overflow-hidden'
		/>
	);
};

export default FlowerRain;
