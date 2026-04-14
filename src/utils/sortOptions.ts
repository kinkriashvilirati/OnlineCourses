export const SORT_OPTIONS = {
  "Newest First": "newest",
  "Price: Low to High": "price_asc",
  "Price: High to Low": "price_desc",
  "Most Popular": "popular",
  "Title: A-Z": "title_asc",
} as const;

export type SortOption = keyof typeof SORT_OPTIONS;
