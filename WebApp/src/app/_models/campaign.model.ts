export interface Campaign {
  _id: string;
  name: string;
  business: string;
  busId: String;
  ownerEmail: String;
  location: [ string ];
  tag: [ string ];
  startDate: string;
  endDate: string;
  maxQty: number;
  image: any;
}
