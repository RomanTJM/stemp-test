import React, { useState } from 'react';
import { Drink } from '../types';

const categories = [
  { key: 'coffee', name: 'Кофе', image: './assets/images/coffee-img.png' },
  { key: 'tea', name: 'Чай', image: './assets/images/tea-img.png' },
  { key: 'milkshake', name: 'Молочный коктейль', image: './assets/images/milk-img.png' },
  { key: 'juice', name: 'Морсы и газ. напитки', image: './assets/images/soda-img.png' },
];

interface DrinkSelectionProps {
  drinks: Drink[];
  onSelectDrink: (drink: Drink) => void;
}

const DrinkSelection: React.FC<DrinkSelectionProps> = ({ drinks, onSelectDrink }) => {
  const [activeCategory, setActiveCategory] = useState('coffee');

  const filteredDrinks = drinks.filter(drink => drink.category === activeCategory);
  const activeCategoryName = categories.find(cat => cat.key === activeCategory)?.name || '';

  return (
    <div className="drink-selection-new">
      <div className="header-block">
        <h1 className="main-title">Выбор напитка</h1>
      </div>
      <div className="categories-row">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className={`category-card${cat.key === activeCategory ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            <img src={cat.image} alt={cat.name} className="category-img" />
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
      <div className="section-title">{activeCategoryName}</div>
      <div className="drinks-grid-new">
        {filteredDrinks.map((drink) => (
          <div
            key={drink.id}
            className="drink-card-new"
            onClick={() => onSelectDrink(drink)}
          >
            {drink.image && (
              <img src={drink.image} alt={drink.name} className="drink-image-new" />
            )}
            <div className="drink-name">{drink.name}</div>
            <div className="drink-price">от <span>{drink.price}₽</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrinkSelection; 