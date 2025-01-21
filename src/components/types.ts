interface RichTextBlock {
  _key: string;
  _type: string;
  children: Array<{ _key: string; _type: string; text: string }>;
}

export type Review = {
  reviewername: string;
  rating: number;
  comment: string;
};

export type ProductType = {
  title: string;
  slug: { current: string };
  sku: string;
  overview: string;
  productdetails: Array<RichTextBlock>;
  additionalInformation: Array<RichTextBlock>;
  images: { asset: { _ref: string; url: string }; alt?: string }[];
  price: number;
  salePrice?: number;
  stockStatus: string;
  sizes: string[];
  colors: string[];
  averageRating: number;
  totalReviews: number;
  productReviews: {  
    averageRating: number; 
    totalReviews: number;  
    reviews: Review[];  
  };
  specialTag?: string[];
  subcategory: { current: string };
  category: { current: string };
}


export type Blogtypes = {
  title: string;
  slug: { current: string };
  overview: string;
  content: Array<RichTextBlock>;
  mainImage: { asset: { _ref: string; url: string }; alt?: string };
  authorName: string;
  authorImage: { asset: { _ref: string; url: string }; alt?: string };
  publishingDate: Date;
  category: string;
} 