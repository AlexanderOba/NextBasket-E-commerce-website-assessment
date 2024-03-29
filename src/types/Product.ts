
export interface RootState {
  product: {
    product: [];
  };
}

export interface ProductState {
  product: Array<any>;
  productDetails: any;
  loading: boolean;
  error: string | null;
}

export interface StarRatingType {
  ratings: number
}
