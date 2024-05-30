export interface Product {
    name: string;
    price: number;
    ingredients: object;
    optionsDisplayed?: boolean;
    editingName?: boolean;
    enabled: boolean;
  }
  