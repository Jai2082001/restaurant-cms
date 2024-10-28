import React, { useState, useEffect, useRef } from 'react'

export function CustomImage({ src, alt, width, height, className = '', sizes = '100vw' }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '50px',
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const generateSrcSet = () => {
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    return widths
      .map((w) => `${src}?w=${w} ${w}w`)
      .join(', ')
  }

  return (
    <div
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
      }}
      className={className}
    >
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          srcSet={generateSrcSet()}
          sizes={sizes}
          loading="lazy"
        />
      )}
    </div>
  )
}

// CustomImage.propTypes = {
//   src: PropTypes.string.isRequired,
//   alt: PropTypes.string.isRequired,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   className: PropTypes.string,
//   sizes: PropTypes.string,
// }

// CustomImage.defaultProps = {
//   className: '',
//   sizes: '100vw',
// }