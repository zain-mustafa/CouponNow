export interface Campaign {
  _id: string;
  name: string;
  business: string;
  busId: String;
  ownerEmail: String;
  location: [ string ];
  startDate: string;
  endDate: string;
  maxQty: number;
  image: any;
}
