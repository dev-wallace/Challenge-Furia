// src/components/Arrows/Arrows.tsx
import React from 'react';
import styles from './styles.module.css';

const Arrows = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  return (
    <div className={styles.arrows}>
      <button id="prev" onClick={onPrev}>&lt;</button>
      <button id="next" onClick={onNext}>&gt;</button>
    </div>
  );
};

export default Arrows;