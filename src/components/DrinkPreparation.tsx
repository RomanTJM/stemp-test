import React, { useEffect, useState } from 'react';
import emulator from '../utils/emulator.ts';

interface DrinkPreparationProps {
  drinkId: number;
  onComplete: (success: boolean) => void;
}

const DrinkPreparation: React.FC<DrinkPreparationProps> = ({ drinkId, onComplete }) => {
  const [status, setStatus] = useState<string>('Приготовление напитка...');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    emulator.Vend(drinkId, (result) => {
      if (result) {
        setStatus('Напиток готов!');
        setIsReady(true);
        setTimeout(() => {
          onComplete(true);
        }, 2000);
      } else {
        setStatus('Ошибка приготовления напитка');
        setTimeout(() => {
          onComplete(false);
        }, 2000);
      }
    });
  }, [drinkId, onComplete]);

  if (isReady) {
    return (
      <div className="drink-ready-mockup">
        <div className="cup-icon-block"><img src="/assets/images/ready-img.png" alt="Готово" /></div>
        <div className="drink-ready-title">Напиток готов!</div>
        <div className="drink-ready-sub">вы можете забрать его</div>
      </div>
    );
  }

  return (
    <div className="window-style">
      <h2 className="window-title">Приготовление напитка</h2>
      <div className="window-status-block">{status}</div>
      <div className="window-hint">
        Для эмуляции успешного приготовления нажмите <b>v</b><br/>
        Для эмуляции ошибки — <b>x</b>
      </div>
    </div>
  );
};

export default DrinkPreparation; 