type Product = {
    id: number;
    title: string;
    slug: string;
    image: string;
    slogn: string,
    newArrival?: boolean,
    salePrice: number;
    originalPrice: number;
    rating: number;
    ratedBy: number;
    description: string;
    size: string[];
    color: string[];
    category?: string;
};

export const Products: Product[] = [
    {
      id: 1,
      title: "Syltherine",
      slogn: "Style Cafe Chair",
      image: "/images/pro1.png",
      salePrice: 2.500,
      originalPrice: 3.500,
      rating: 4,
      ratedBy: 88,
      slug: "Syltherine-new-product",
      description: "A stylish cafe chair that combines elegance with comfort, perfect for any modern space.",
      size: ["S", "M", "L", 'XL'],
      color: ["Black", "Red"],
    },
    {
      id: 2,
      title: "Leviosa",
      slogn: "Style Cafe Chair",
      image: "/images/pro8.jpg",
      salePrice: 0,
      originalPrice: 3.500,
      rating: 4,
      ratedBy: 88,
      slug: "Leviosa-new-product",
      description: "Lightweight and sleek, this chair is designed for those who love simplicity and style.",
      size: ["S", "M", "L", 'XL'],
      color: ["Black", "Red"],
    },
    {
      id: 3,
      title: "Lolito",
      slogn: "Luxury big sofa",
      image: "/images/pro3.png",
      salePrice: 0,
      originalPrice: 3.500,
      rating: 4,
      ratedBy: 88,
      slug: "Lolito-new-product",
      description: "A luxurious sofa with ample space and plush comfort, ideal for your living room centerpiece.",
      size: ["S", "M", "L", 'XL'],
      color: ["Black", "Red"],
    },
    {
      id: 3,
      title: "Respira",
      slogn: "Outdoor bar table and stool",
      image: "/images/pro4.png",
      salePrice: 0,
      originalPrice: 3.500,
      rating: 4,
      ratedBy: 88,
      slug: "Respira-new-product",
      description: "Durable and stylish outdoor furniture, perfect for relaxing evenings and social gatherings.",
      size: ["S", "M", "L", 'XL'],
      color: ["Black", "Red"],
    },
    {
      id: 4,
      title: "Grifo",
      slogn: "Night lamp",
      image: "/images/pro5.png",
      salePrice: 0,
      originalPrice: 1.500,
      rating: 4,
      ratedBy: 88,
      slug: "Grifo-new-product",
      description: "A sleek and modern night lamp that provides a warm and cozy glow for your space.",
      size: ["S", "M", "L", 'XL'],
      color: ["Black", "Red"],
      newArrival: true,
    },
    {
      id: 4,
      title: "Muggo",
      slogn: "Small mug",
      image: "/images/pro6.png",
      salePrice: 0,
      originalPrice: 150,
      rating: 4,
      ratedBy: 88,
      slug: "Small-mug-new-product",
      description: "A compact and sturdy mug, perfect for your morning coffee or tea.",
      size: ["S", "M", "L", 'XL'],
      color: ["Black", "Red"],
      newArrival: true,
    },
    {
      id: 5,
      title: "Pingky",
      slogn: "Cute bed set",
      image: "/images/pro7.png",
      salePrice: 7000,
      originalPrice: 14000,
      rating: 4,
      ratedBy: 88,
      slug: "pingky-new-product",
      description: "A charming and cozy bed set, designed to add comfort and style to your bedroom.",
      size: ["S", "M", "L", 'XL'],
      color: ["Black", "Red"],
      newArrival: true,
    },
    {
      id: 6,
      title: "Potty",
      slogn: "Minimalist flower pot",
      image: "/images/pro2.png",
      salePrice: 0,
      originalPrice: 150,
      rating: 4,
      ratedBy: 88,
      slug: "Potty-new-product",
      description: "A minimalist flower pot that brings a touch of elegance to your indoor plants.",
      size: ["S", "M", "L", 'XL'],
      color: ["Black", "Red"],
      newArrival: true,
    },
];
  