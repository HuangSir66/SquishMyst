// Shopify OS 2.0 Compatible Data Types & Schemas

export type ProductSalesMode = 'blind_box' | 'direct_purchase' | 'chase_exclusive';
export type ToyType = 'dumpling' | 'animal' | 'bakery' | 'fruit' | 'accessories' | 'sets';
export type ToyTexture = 'slow_rise' | 'jelly_water' | 'sugar_clay' | 'flocked_velvet';

export interface ShopifyOption {
  name: string;
  position: number;
  values: string[];
}

export interface ProductVariant {
  id: string; // matches Shopify variant ID format
  title: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  colorHex: string;
  inStock: boolean;
  sku: string;
  optionValues?: Record<string, string>; // e.g. { "Pack Size": "3-Pack", "Scent": "Vanilla" }
}

export interface DumplingProduct {
  id: string;
  handle: string; // Shopify slug / handle
  slug?: string;
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tag?: 'Bestseller' | 'Viral on TikTok' | 'Limited Edition' | 'New' | 'Mystery' | 'Chase Rare' | 'Community Fav';
  category: 'blindbox' | 'direct_pick' | 'flavors' | 'sets' | 'jumbo' | 'accessories' | 'chase_vault';
  toyType?: ToyType; // e.g. 'dumpling' | 'animal' | 'bakery' | 'fruit' | 'accessories' | 'sets'
  textureType?: ToyTexture; // 'slow_rise' | 'jelly_water' | 'sugar_clay' | 'flocked_velvet'
  salesMode: ProductSalesMode; // 'blind_box' | 'direct_purchase' | 'chase_exclusive'
  isChaseExclusive?: boolean; // If true, cannot be directly purchased; only unboxed from mystery boxes
  chaseOdds?: string; // e.g. "1 in 24 boxes (4.1%)"
  squishScore: number; // e.g. 9.8 / 10
  slowRiseSeconds: number; // e.g. 4.8s
  aroma: string;
  colorTheme: string;
  accentColor: string;
  bgGradient: string;
  includesSteamer: boolean;
  inStock: boolean;
  description: string;
  features: string[];
  dimensions: string;
  weight: string;
  material: string;
  options?: ShopifyOption[];
  variants: ProductVariant[];
  rarity?: 'Common' | 'Rare' | 'Super Rare' | 'Secret Legendary';
  svgArtType:
    | 'classic'
    | 'custard'
    | 'matcha'
    | 'taro'
    | 'strawberry'
    | 'charcoal'
    | 'ghost'
    | 'jumbo'
    | 'blindbox'
    | 'chilioil'
    | 'steamer-empty'
    | 'set6'
    | 'capybara'
    | 'shiba'
    | 'corgi'
    | 'cat_paw'
    | 'bunny'
    | 'panda'
    | 'croissant'
    | 'donut'
    | 'toast'
    | 'peach'
    | 'cheese'
    | 'mochi'
    | 'boba';
}

export type SquishyProduct = DumplingProduct;

// Shopify Cart Line Item with Line Item Properties support
export interface ShopifyLineItemProperty {
  [key: string]: string | boolean | number;
}

export interface CartItem {
  id: string; // line item key in Shopify cart
  variantId: string;
  product: DumplingProduct;
  selectedVariant: ProductVariant;
  quantity: number;
  price: number;
  originalPrice?: number;
  linePrice: number;
  properties?: {
    _sales_mode?: ProductSalesMode;
    _steamer_included?: boolean;
    _is_mystery?: boolean;
    _mystery_pool?: string;
    'Country / Flag'?: string;
    'Custom Gift Message'?: string;
    'Special Request'?: string;
    [key: string]: string | boolean | number | undefined;
  };
}

export interface ShopifyCart {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  originalTotalPrice: number;
  totalDiscount: number;
  note: string;
  appliedDiscountCode?: string;
  discountPercentage: number;
  freeShippingThreshold: number;
}

export interface Review {
  id: string;
  author: string;
  avatarColor: string;
  rating: number;
  verified: boolean;
  title: string;
  content: string;
  date: string;
  productName: string;
  helpfulCount: number;
  tags: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'product' | 'care' | 'shipping' | 'bundles' | 'mystery';
}

export interface MysteryPoolItem {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Super Rare' | 'Secret Legendary';
  rarityColor: string;
  chance: string;
  flavor: string;
  description: string;
  svgType: string;
  isSecretChase?: boolean;
}
