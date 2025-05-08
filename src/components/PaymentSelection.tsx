import React from 'react';
import { PaymentMethod } from '../types';

interface PaymentSelectionProps {
  selectedDrink: {
    name: string;
    price: number;
  };
  onSelectPayment: (method: PaymentMethod) => void;
}

const PaymentSelection: React.FC<PaymentSelectionProps> = ({
  selectedDrink,
  onSelectPayment,
}) => {
  return (
    <div className="window-style">
      <h2 className="window-title">Выберите способ оплаты</h2>
      <div className="window-info-block">
        <div className="window-drink-name">{selectedDrink.name}</div>
        <div className="window-drink-price">Стоимость: <span>{selectedDrink.price} ₽</span></div>
      </div>
      <div className="window-btn-row">
        <button
          className="window-btn cash"
          onClick={() => onSelectPayment('cash')}
        >
          Оплата наличными
        </button>
        <button
          className="window-btn card"
          onClick={() => onSelectPayment('card')}
        >
          Оплата картой
        </button>
      </div>
    </div>
  );
};

export default PaymentSelection; 