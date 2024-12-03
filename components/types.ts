export type Stage = {
  id: string;
  name: string;
  pricePerUnit: number;
  conversionRate: number;
  order: number;  // To maintain the correct calculation order
};

export type SalesPlan = {
  targetIncome: number;
  stages: Stage[];
};
