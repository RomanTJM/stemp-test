import React, { useState } from 'react';
import { Drink, PaymentMethod } from './types';
import DrinkSelection from './components/DrinkSelection.tsx';
import PaymentSelection from './components/PaymentSelection.tsx';
import CashPayment from './components/CashPayment.tsx';
import CardPayment from './components/CardPayment.tsx';
import DrinkPreparation from './components/DrinkPreparation.tsx';
import './App.css';

const drinks: Drink[] = [
  {
    id: 1,
    name: 'Эспрессо',
    description: 'Крепкий кофе с насыщенным вкусом',
    price: 100,
    category: 'coffee',
  },
  {
    id: 2,
    name: 'Капучино',
    description: 'Кофе с молочной пенкой',
    price: 150,
    category: 'coffee',
  },
  {
    id: 3,
    name: 'Латте',
    description: 'Кофе с большим количеством молока',
    price: 170,
    category: 'coffee',
  },
  {
    id: 4,
    name: 'Чёрный чай',
    description: 'Классический чёрный чай',
    price: 70,
    category: 'tea',
  },
  {
    id: 5,
    name: 'Зелёный чай',
    description: 'Освежающий зелёный чай',
    price: 80,
    category: 'tea',
  },
  {
    id: 6,
    name: 'Молочный коктейль',
    description: 'Ванильный молочный коктейль',
    price: 120,
    category: 'milkshake',
  },
  {
    id: 7,
    name: 'Морс',
    description: 'Ягодный морс',
    price: 90,
    category: 'juice',
  },
];

const App: React.FC = () => {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isPreparationComplete, setIsPreparationComplete] = useState(false);

  const handleSelectDrink = (drink: Drink) => {
    setSelectedDrink(drink);
  };

  const handleSelectPayment = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handlePaymentComplete = (success: boolean) => {
    setIsPaymentComplete(success);
  };

  const handlePreparationComplete = (success: boolean) => {
    setIsPreparationComplete(success);
  };

  const resetState = () => {
    setSelectedDrink(null);
    setPaymentMethod(null);
    setIsPaymentComplete(false);
    setIsPreparationComplete(false);
  };

  if (isPreparationComplete) {
    return (
      <div className="window-style">
        <div className="window-status-block">
          <h2 className="window-title">Спасибо за покупку!</h2>
          <button className="window-btn success" onClick={resetState}>Сделать новый заказ</button>
        </div>
      </div>
    );
  }

  if (isPaymentComplete && selectedDrink) {
    return (
      <div className="app">
        <DrinkPreparation
          drinkId={selectedDrink.id}
          onComplete={handlePreparationComplete}
        />
      </div>
    );
  }

  if (paymentMethod && selectedDrink) {
    return (
      <div className="app">
        {paymentMethod === 'cash' ? (
          <CashPayment
            price={selectedDrink.price}
            onPaymentComplete={handlePaymentComplete}
          />
        ) : (
          <CardPayment
            price={selectedDrink.price}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </div>
    );
  }

  if (selectedDrink) {
    return (
      <div className="app">
        <PaymentSelection
          selectedDrink={selectedDrink}
          onSelectPayment={handleSelectPayment}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <DrinkSelection drinks={drinks} onSelectDrink={handleSelectDrink} />
    </div>
  );
};

export default App; 