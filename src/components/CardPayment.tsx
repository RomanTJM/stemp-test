import React, { useState } from 'react';
import emulator from '../utils/emulator.ts';

interface CardPaymentProps {
  price: number;
  onPaymentComplete: (success: boolean) => void;
}

const CardPayment: React.FC<CardPaymentProps> = ({ price, onPaymentComplete }) => {
  const [displayMessage, setDisplayMessage] = useState<string>('');

  const handlePayment = () => {
    emulator.BankCardPurchase(
      price,
      (result) => {
        onPaymentComplete(result);
      },
      (message) => {
        setDisplayMessage(message);
      }
    );
  };

  React.useEffect(() => {
    handlePayment();
  }, []);

  React.useEffect(() => {
    const handleCancel = (event: KeyboardEvent) => {
      if (event.key === 'c') {
        emulator.BankCardCancel();
      }
    };
    window.addEventListener('keypress', handleCancel);
    return () => {
      window.removeEventListener('keypress', handleCancel);
    };
  }, []);

  return (
    <div className="window-style">
      <h2 className="window-title">Оплата картой</h2>
      <div className="window-info-block">
        <div>Сумма к оплате: <span>{price} ₽</span></div>
      </div>
      <div className="window-pinpad-display">{displayMessage}</div>
      <div className="window-hint">
        Для эмуляции успешной оплаты нажмите <b>y</b><br/>
        Для неуспешной оплаты — <b>n</b><br/>
        Для отмены — <b>c</b>
      </div>
    </div>
  );
};

export default CardPayment; 