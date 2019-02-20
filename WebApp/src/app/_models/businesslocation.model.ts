export interface BusinessLocation {
    _id : string,
    streetnum: { type: String},
    streetname: { type: String},
    city: { type: String},
    postalcode: { type: String},
    lon: { type: Number},
    lat: { type: Number}
  }