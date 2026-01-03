// Shared types for the microfrontend application

export interface CartItem {
  bookId: string;
  image: string;
  title: string;
  quantity: number;
  price?: number;
}

export interface BookVolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  description?: string;
  pageCount?: number;
  publisher?: string;
  publishedDate?: string;
  categories?: string[];
}

export interface BookSaleInfo {
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
  retailPrice?: {
    amount: number;
    currencyCode: string;
  };
  buyLink?: string;
}

export interface Book {
  id: string;
  volumeInfo: BookVolumeInfo;
  saleInfo: BookSaleInfo;
}

export interface GlobalContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  selectedBook: string | null;
  setSelectedBook: React.Dispatch<React.SetStateAction<string | null>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  addToCart: (data: CartItem) => void;
}
