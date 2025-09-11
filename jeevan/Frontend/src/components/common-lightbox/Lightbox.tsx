import React, { useEffect } from "react";

interface LightboxProps {
  images: { src: string; bigSrc?: string; alt?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, isOpen, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen) return null;
  const image = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div
      className="lightbox-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${currentIndex + 1} of ${images.length}`}
    >
      <div
        className="lightbox-content"
        style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
          aria-label="Close lightbox"
          type="button"
        >
          ✕
        </button>
        {hasPrev && (
          <button
            onClick={e => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
            style={{
              position: "absolute",
              left: -70,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "rgba(0,0,0,0.4)",
              border: "none",
              color: "#fff",
              fontSize: 40,
              width: 60,
              height: 60,
              cursor: "pointer",
              borderRadius: "0 30px 30px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            aria-label="Previous image"
            className="lightbox-arrow lightbox-arrow-left"
            type="button"
          >
            ◀
          </button>
        )}
        {hasNext && (
          <button
            onClick={e => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
            style={{
              position: "absolute",
              right: -70,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "rgba(0,0,0,0.4)",
              border: "none",
              color: "#fff",
              fontSize: 40,
              width: 60,
              height: 60,
              cursor: "pointer",
              borderRadius: "30px 0 0 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            aria-label="Next image"
            className="lightbox-arrow lightbox-arrow-right"
            type="button"
          >
            ▶
          </button>
        )}
        <img
          id="lightbox-image"
          src={image.bigSrc || image.src}
          alt={image.alt || `Image ${currentIndex + 1} of ${images.length}`}
          style={{ maxWidth: "80vw", maxHeight: "80vh", borderRadius: 8, display: "block" }}
          aria-describedby="lightbox-description"
        />
        <div id="lightbox-description" className="sr-only">
          {image.alt || `Image ${currentIndex + 1} of ${images.length}`}
        </div>
      </div>
    </div>
  );
};

export default Lightbox; 