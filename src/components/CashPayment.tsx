import React, { useEffect, useState } from 'react';
import emulator from '../utils/emulator.ts';

interface CashPaymentProps {
  price: number;
  onPaymentComplete: (success: boolean) => void;
}

const CashPayment: React.FC<CashPaymentProps> = ({ price, onPaymentComplete }) => {
  const [insertedAmount, setInsertedAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleCashIn = (amount: number) => {
      setInsertedAmount((prev) => prev + amount);
    };

    emulator.StartCashin(handleCashIn);

    return () => {
      emulator.StopCashin(() => {});
    };
  }, []);

  useEffect(() => {
    if (insertedAmount >= price && !isProcessing) {
      setIsProcessing(true);
      const change = insertedAmount - price;
      if (change > 0) {
        console.log(`Выдача сдачи: ${change} ₽`);
      }
      onPaymentComplete(true);
    }
  }, [insertedAmount, price, isProcessing, onPaymentComplete]);

  return (
    <div className="window-style">
      <h2 className="window-title">Оплата наличными</h2>
      <div className="window-info-block">
        <div>Сумма к оплате: <span>{price} ₽</span></div>
        <div>Внесено: <span>{insertedAmount} ₽</span></div>
        {insertedAmount < price && (
          <div>Осталось внести: <span>{price - insertedAmount} ₽</span></div>
        )}
      </div>
      <div className="window-hint">Для эмуляции внесения денег используйте клавиши 1-9</div>
    </div>
  );
};

export default CashPayment; 