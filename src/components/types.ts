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


export type Address = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  addressResidentialIndicator: "yes" | "no";
};
export type unit = "ounce" | "gram" | "kilogram" | "pound";
export type dimensionUnit = "inch" | "centimeter";

export type Package = {
  weight: {
    value: number;
    unit: unit;
  };
  dimensions: {
    height: number;
    width: number;
    length: number;
    unit: dimensionUnit;
  };
};

export type Rate = {
  rateId: string;
  rateType: string;
  carrierId: string;
  shippingAmount: {
    currency: string;
    amount: number;
  };
  serviceType: string;
  serviceCode: string;
  trackable: boolean;
  carrierFriendlyName: string;
  validationStatus: string;
  warningMessages?: string[];
};


export interface trackingObjType {
  trackingNumber: string;
  labelId: string;
  carrierCode: string;
}

export interface TrackingData {
  trackingNumber?: string;
  statusDescription?: string;
  carrierStatusDescription?: string;
  estimatedDeliveryDate?: string;
  actualDeliveryDate?: string;
}