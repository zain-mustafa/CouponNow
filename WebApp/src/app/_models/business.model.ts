import { BusinessLocation } from './businesslocation.model';

export interface Business {
    businessname: string;
    licensenum: string;
    locations: BusinessLocation[]
}
