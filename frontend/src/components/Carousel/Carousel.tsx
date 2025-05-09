import { useState } from 'react';
import CarouselItem from './CarouselItem';

import Arrows from '../Arrows/Arrows';

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

 

  return (
    <div className={styles.carousel}>
      <div className={styles.list}>
        {jogadores.map((jogador, index) => (
          <CarouselItem
            key={jogador.id}
            jogadores={jogador}  
            active={index === currentIndex}
            onWatchNow={() => window.open(jogador.watchLink, '_blank')}
          />
        ))}
      </div>



      <Arrows onPrev={prevSlide} onNext={nextSlide} />
      


     
    </div>
  );
};

export default Carousel;