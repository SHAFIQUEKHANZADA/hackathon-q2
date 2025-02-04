import { Package, dimensionUnit, unit } from "./types"; // Import dimensionUnit

// Define a type for dimensions
export interface Dimensions {
  height: number;
  width: number;
  length: number;
  unit: dimensionUnit; // Change from string to dimensionUnit
}

// Define a type for weight
export interface Weight {
  value: number;
  unit: unit; // Ensure unit is also consistent with Package
}

// Update the Product interface to use the defined types
export interface Product extends Package {
  dimensions: Dimensions;
  weight: Weight;
  name: string;
}


export const cartProductsWhichCanBeShipped: Product[] = [
  {
    name: "Product 1",
    weight: { value: 5, unit: "ounce" },
    dimensions: { height: 3, width: 15, length: 10, unit: "inch" },
  },
  {
    name: "Product 2",
    weight: { value: 0.5, unit: "ounce" },
    dimensions: { height: 0.5, width: 3, length: 6, unit: "inch" },
  },
  {
    name: "Product 3",
    weight: { value: 0.8, unit: "ounce" },
    dimensions: { height: 8, width: 6, length: 3, unit: "inch" },
  },
];