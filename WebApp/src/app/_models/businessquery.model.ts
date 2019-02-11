import { Business } from './business.model';
import { BusinessLocation } from './businesslocation.model';

export interface BusinessQuery {
    owneremail: string;
    businessindex: Number;
    location: BusinessLocation;
}
