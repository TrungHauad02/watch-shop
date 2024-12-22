import { Product } from "../utils/types";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Royal Oak Chronograph",
    price: 18700000,
    type: "Chronograph",
    brand: "Audemars Piguet",
    description:
      "A masterpiece of horology, featuring the iconic octagonal bezel and tapisserie dial.",
    specifications: {
      movement: "Tự động",
      caseSize: "41mm",
      caseMaterial: "Stainless Steel",
      waterResistance: "50m",
      crystal: "Sapphire",
      powerReserve: "70 giờ",
    },
    images: [
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "2",
    name: "Nautilus Blue Dial",
    price: 16800000,
    type: "Sports Luxury",
    brand: "Patek Philippe",
    description:
      "The legendary Nautilus, featuring the iconic porthole-inspired case design.",
    specifications: {
      movement: "Tự động",
      caseSize: "40mm",
      caseMaterial: "Stainless Steel",
      waterResistance: "120m",
      crystal: "Sapphire",
      powerReserve: "45 giờ",
    },
    images: [
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "3",
    name: "Daytona Platinum",
    price: 28700000,
    type: "Chronograph",
    brand: "Rolex",
    description:
      "The ultimate chronograph watch, featuring a platinum case and ceramic bezel.",
    specifications: {
      movement: "Tự động",
      caseSize: "40mm",
      caseMaterial: "Platinum",
      waterResistance: "100m",
      crystal: "Sapphire",
      powerReserve: "72 giờ",
    },
    images: [
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

interface filterProps {
  searchQuery?: string;
  selectedSort?: string;
  selectedBrands?: string[];
  selectedTypes?: string[];
  priceRange?: { min: number; max: number };
}

const getAllProduct = ({
  searchQuery = "",
  selectedSort = "price-asc",
  selectedBrands = [],
  selectedTypes = [],
  priceRange = { min: 0, max: Infinity },
}: filterProps) => {
  const withinPriceRange = (price: number) =>
    price >= priceRange.min && price <= priceRange.max;

  return mockProducts
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const matchesPrice = withinPriceRange(product.price);
      return matchesSearch && matchesBrand && matchesType && matchesPrice;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
};

const getProductById = (id: string) => {
  return mockProducts.find((p) => p.id === id) || null;
};

const getAllBrands = () => {
  return [...new Set(mockProducts.map((p) => p.brand))];
};

const getAllTypes = () => {
  return [...new Set(mockProducts.map((p) => p.type))];
};

const getMaxPrice = () => {
  return Math.max(...mockProducts.map((p) => p.price));
};

export const productService = {
  getAllProduct,
  getAllBrands,
  getAllTypes,
  getMaxPrice,
  getProductById,
};
