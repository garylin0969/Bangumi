import { useState } from 'react';
import { cn } from '@/utils/shadcn';

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    fallback?: string;
    className?: string;
    onError?: () => void;
}

const ImageWithFallback = ({
    src,
    alt,
    fallback = '/placeholder-image.png',
    className,
    onError,
}: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(fallback);
            onError?.();
        }
    };

    return (
        <img src={imgSrc} alt={alt} className={cn('object-cover', className)} onError={handleError} loading="lazy" />
    );
};

export default ImageWithFallback;
