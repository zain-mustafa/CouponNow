import { CampaignLoc } from './campaignLoc.model';

export interface Campaign {
  _id: string;
  name: string;
  business: string;
  busId: String;
  ownerEmail: String;
  locNames: String[];
  location: {
    type: String;
    coordinates: Number[][];
  };
  tag: [ string ];
  startDate: string;
  endDate: string;
  maxQty: number;
  image: any;
}
