export interface Campaign {
  _id: string;
  name: string;
  business: string;
  location: [ string ];
  startDate: string;
  endDate: string;
  maxQty: number;
  image: any;
}
