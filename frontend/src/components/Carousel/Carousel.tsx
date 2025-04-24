import { useState } from 'react';
import CarouselItem from './CarouselItem';
import Thumbnail from '../Thumbnail/Thumbnail';
import Arrows from '../Arrows/Arrows';
import Popup from '../Popup/Popup';
import styles from './styles.module.css';
import { Jogadores } from '../../types/types';
import React from 'react';

interface CarouselProps {
  jogadores: Jogadores[];
}

const Carousel = ({ jogadores }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === jogadores.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? jogadores.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className={styles.carousel}>
      <div className={styles.list}>
        {jogadores.map((jogador, index) => (
          <CarouselItem
            key={jogador.id}
            jogadores={jogador}  // Corrigido o nome da prop
            active={index === currentIndex}
            onWatchNow={() => window.open(jogador.watchLink, '_blank')}
          />
        ))}
      </div>

      <Thumbnail
        jogadores={jogadores}
        currentIndex={currentIndex}
        onThumbnailClick={goToSlide}
      />

      <Arrows onPrev={prevSlide} onNext={nextSlide} />
      
      <button onClick={openPopup} className={styles.addButton}>
        Add Movie
      </button>

      <Popup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default Carousel;