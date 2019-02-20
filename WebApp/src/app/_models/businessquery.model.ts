import { Business } from './business.model';
import { BusinessLocation } from './businesslocation.model';

export interface BusinessQuery {
    owneremail: string;
    businessindex: string;
    business: Business;
    locationindex: string;
    location: BusinessLocation;
}
