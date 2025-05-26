import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

// Pre-defined media items
const staticMedia = [
  {
    id: '1',
    title: '',
    url: '/image1.jpeg',
    type: 'image' as const
  },
  {
    id: '2',
    title: '',
    url: 'image2.jpeg',
    type: 'image' as const
  },
  {
    id: '3',
    title: '',
    url: 'image3.jpeg',
    type: 'image' as const
  },
  {
    id: '4',
    title: '',
    url: 'image4.jpeg',
    type: 'image' as const
  },
  {
    id: '5',
    title: '',
    url: 'image5.jpeg',
    type: 'image' as const
  },
  {
    id: '6',
    title: '',
    url: 'image6.jpeg',
    type: 'image' as const
  },
  {
    id: '7',
    title: '',
    url: 'image7.jpeg',
    type: 'image' as const
  },
  {
    id: '8',
    title: '',
    url: 'image8.jpeg',
    type: 'image' as const
  },
  {
    id: '9',
    title: '',
    url: 'image9.jpeg',
    type: 'image' as const
  },
  {
    id: '10',
    title: '',
    url: 'image10.jpeg',
    type: 'image' as const
  },
  {
    id: '11',
    title: '',
    url: 'image11.jpeg',
    type: 'image' as const
  },
  {
    id: '12',
    title: '',
    url: 'image12.jpeg',
    type: 'image' as const
  },
  {
    id: '13',
    title: '',
    url: 'image13.jpeg',
    type: 'image' as const
  },
  {
    id: '14',
    title: '',
    url: 'image14.jpeg',
    type: 'image' as const
  },
  {
    id: '15',
    title: '',
    url: 'image6.jpeg',
    type: 'image' as const
  },
  {
    id: '16',
    title: '',
    url: 'image20.jpg',
    type: 'image' as const
  },
  {
    id: '17',
    title: '',
    url: 'image19.jpeg',
    type: 'image' as const
  },
  {
    id: '18',
    title: '',
    url: 'IMAGE29.jpeg',
    type: 'image' as const
  },
  {
    id: '19',
    title: '',
    url: 'image18.jpeg',
    type: 'image' as const
  },
  {
    id: '20',
    title: '',
    url: 'image17.jpeg',
    type: 'image' as const
  },
  {
    id: '21',
    title: '',
    url: 'image15.mp4',
    type: 'image' as const
  },
  {
    id: '22',
    title: '',
    url: 'image16.jpeg',
    type: 'image' as const
  },
  {
    id: '23',
    title: '',
    url: 'image21.jpg',
    type: 'image' as const
  },
  {
    id: '24',
    title: '',
    url: 'image22.jpg',
    type: 'image' as const
  },
  {
    id: '25',
    title: '',
    url: 'image23.JPG',
    type: 'image' as const
  },
  {
    id: '26',
    title: '',
    url: 'image24.jpg',
    type: 'image' as const
  },
];

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState<typeof staticMedia[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleMediaClick(media: typeof staticMedia[0], index: number) {
    setSelectedMedia(media);
    setCurrentIndex(index);
  }

  function handlePrevious() {
    const newIndex = (currentIndex - 1 + staticMedia.length) % staticMedia.length;
    setCurrentIndex(newIndex);
    setSelectedMedia(staticMedia[newIndex]);
  }

  function handleNext() {
    const newIndex = (currentIndex + 1) % staticMedia.length;
    setCurrentIndex(newIndex);
    setSelectedMedia(staticMedia[newIndex]);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedMedia) {
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') setSelectedMedia(null);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, currentIndex]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Media Gallery</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Explore our collection of photos and videos showcasing Cyberhouse events, workshops, and community activities.
          </p>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticMedia.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleMediaClick(item, index)}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-video"
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="relative w-full h-full bg-gray-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-16 w-16 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Viewer Modal with Slider */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50"
          >
            <ChevronRight className="h-12 w-12" />
          </button>

          <div className="max-w-7xl max-h-[90vh] overflow-auto">
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.title}
                className="max-w-full max-h-[90vh] object-contain"
              />
            ) : (
              <iframe
                src={selectedMedia.url}
                className="w-full aspect-video max-h-[90vh]"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-lg font-semibold">{selectedMedia.title}</p>
              <p className="text-sm text-gray-300">
                {currentIndex + 1} of {staticMedia.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}