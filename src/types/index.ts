export interface Drink {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export interface Emulator {
  StartCashin: (callback: (amount: number) => void) => void;
  StopCashin: (callback: () => void) => void;
  BankCardPurchase: (
    amount: number,
    callback: (result: boolean) => void,
    displayCallback: (message: string) => void
  ) => void;
  BankCardCancel: () => void;
  Vend: (product_idx: number, callback: (result: boolean) => void) => void;
}

export type PaymentMethod = 'cash' | 'card'; 