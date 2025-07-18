import React, { useState, useEffect } from 'react';

export default function BackdropSlider({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Skip if no images
        if (!images || images.length <= 1) return;

        // Set up interval to change image
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % images.length
            );
        }, 5000); // Change every 5 seconds

        // Clean up interval
        return () => clearInterval(imageInterval);
    }, [images]);

    // If no images, return null or a placeholder
    if (!images || images.length === 0) return null;

    return (
        <img 
            src={images[currentImageIndex].file_path} 
            alt="movie backdrop" 
            className="img-main" 
            style={{ 
                transition: 'opacity 0.5s ease-in-out',
            }}
        />
    );
}