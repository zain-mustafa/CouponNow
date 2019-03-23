import { BusinessLocation } from './businesslocation.model';

export interface Business {
    _id: string;
    businessname: string;
    licensenum: string;
    locations: BusinessLocation[];
}
