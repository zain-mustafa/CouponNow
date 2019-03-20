export interface BusinessLocation {
    _id : string,
    streetnum: { type: String},
    streetname: { type: String},
    city: { type: String},
    postalcode: { type: String},
    geolocation: {
      type: { type: String },
      coordinates: [Number, Number]
      }
  }