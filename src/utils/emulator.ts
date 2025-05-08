import { Emulator } from '../types';

declare global {
  interface Window {
    emulator: Emulator;
  }
}

let cardPaymentCancelRequested = false;

const emulator: Emulator = {
  StartCashin: (cb) => {
    // Эмуляция приема купюр по нажатию клавиш 1-9
    const handleKeyPress = (event: KeyboardEvent) => {
      const amount = parseInt(event.key);
      if (amount >= 1 && amount <= 9) {
        cb(amount);
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    window.emulator = emulator;
  },

  StopCashin: (cb) => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const amount = parseInt(event.key);
      if (amount >= 1 && amount <= 9) {
        cb();
      }
    };
    window.removeEventListener('keypress', handleKeyPress);
    cb();
  },

  BankCardPurchase: (amount, cb, display_cb) => {
    let isProcessing = true;
    cardPaymentCancelRequested = false;
    
    // Эмуляция сообщений пин-пада
    display_cb('Приложите карту');
    
    // Эмуляция успешной оплаты по нажатию 'y', неуспешной по нажатию 'n'
    const handleCardPayment = (event: KeyboardEvent) => {
      if (!isProcessing) return;
      
      if (cardPaymentCancelRequested) {
        display_cb('Операция отменена');
        cb(false);
        isProcessing = false;
        window.removeEventListener('keypress', handleCardPayment);
        return;
      }

      if (event.key === 'y') {
        display_cb('Обработка карты');
        setTimeout(() => {
          display_cb('Связь с банком');
          setTimeout(() => {
            display_cb('Оплата успешна');
            cb(true);
            isProcessing = false;
            window.removeEventListener('keypress', handleCardPayment);
          }, 1000);
        }, 1000);
      } else if (event.key === 'n') {
        display_cb('Ошибка оплаты');
        cb(false);
        isProcessing = false;
        window.removeEventListener('keypress', handleCardPayment);
      }
    };
    
    window.addEventListener('keypress', handleCardPayment);
  },

  BankCardCancel: () => {
    cardPaymentCancelRequested = true;
  },

  Vend: (product_idx, cb) => {
    // Эмуляция выдачи напитка по нажатию 'v' для успеха, 'x' для неудачи
    const handleVend = (event: KeyboardEvent) => {
      if (event.key === 'v') {
        cb(true);
      } else if (event.key === 'x') {
        cb(false);
      }
    };
    window.addEventListener('keypress', handleVend);
  }
};

export default emulator; 