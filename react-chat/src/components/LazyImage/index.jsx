import React, { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });

        const currentRef = imgRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <img
            ref={imgRef}
            src={isVisible ? src : undefined}
            alt={alt}
            {...props}
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
        />
    );
};

export default LazyImage;