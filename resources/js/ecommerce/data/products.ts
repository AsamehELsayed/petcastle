export type Category = string;

export interface Product {
  id: number | string;
  name: string;
  brand?: any;
  price: number;
  original_price?: number;
	originalPrice?: number;
  categories?: any[];
  main_image?: string;
	imageUrl?: string;
  is_deal?: boolean;
  is_trending?: boolean;
  status?: string;
	type?: string;
	description?: string;
}

export const products: Product[] = [];
