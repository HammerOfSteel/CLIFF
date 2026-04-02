'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfPath: string;
}

export default function PDFViewer({ pdfPath }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      // Account for header (64px) and bottom nav (72px) = 136px total
      const availableHeight = window.innerHeight - 136;
      // Use 90% of viewport width to leave margins
      const availableWidth = window.innerWidth * 0.9;
      setContainerWidth(Math.min(availableWidth, availableHeight * 0.7)); // Aspect ratio consideration
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoading(false);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    const touchStartY = e.touches[0].clientY;

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const touchEndX = endEvent.changedTouches[0].clientX;
      const touchEndY = endEvent.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Horizontal swipe detection (prioritize over vertical)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Swipe right - previous page
          goToPrevPage();
        } else {
          // Swipe left - next page
          goToNextPage();
        }
      }

      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center bg-dark overflow-hidden"
      onTouchStart={handleTouchStart}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-text-dim">Laddar PDF...</div>
        </div>
      )}

      <div className="flex items-center justify-center w-full h-full p-4">
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-text-dim">Laddar...</div>}
          error={<div className="text-red-400">Kunde inte ladda PDF</div>}
          className="flex items-center justify-center"
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={containerWidth || undefined}
            className="shadow-2xl"
          />
        </Document>
      </div>

      {/* Navigation Controls */}
      {!loading && numPages > 0 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-dark/80 backdrop-blur-sm rounded-full p-3 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/20 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6 text-text" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-dark/80 backdrop-blur-sm rounded-full p-3 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/20 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6 text-text" />
          </button>

          {/* Page Counter */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 bg-dark/80 backdrop-blur-sm rounded-full px-4 py-2 text-text-dim text-sm">
            Sida {pageNumber} / {numPages}
          </div>

          {/* Swipe Hint */}
          <div className="absolute top-4 right-4 z-10 text-text-dim text-xs opacity-70">
            ← Svep →
          </div>
        </>
      )}
    </div>
  );
}
