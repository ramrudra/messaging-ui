import Immutable from 'immutable';

/***
 * This is the source of truth for listing data structures
 * across different parts of the product.
 *
 * Notes:
 * 1. If property doesn't exist, its key has to be set to null, or
 * removed altogether. Trying to write an 'undefined' value to firebase
 * will cause the write to fail.  So, if a value might not be there, assign it
 * to null with a ternary, eg, {key: value || null} or .remove() it
 ***/

export const LISTING_ENUMS = {
  laundry: {
    PRESENT_LOC_UNKNOWN: 'PRESENT_LOC_UNKNOWN',
    IN_UNIT: 'IN_UNIT',
    ON_SITE: 'ON_SITE',
    IN_BUILDING: 'IN_BUILDING',
    HOOKUPS: 'HOOKUPS',
  },
  parking: {
    STREET: 'STREET',
    OFF_STREET: 'OFF_STREET',
    GARAGE_ATTACHED: 'GARAGE_ATTACHED',
    GARAGE_DETACHED: 'GARAGE_DETACHED',
    CARPORT: 'CARPORT',
    VALET: 'VALET',
  },
  dwellingType: {
    APARTMENT: 'APARTMENT',
    LOFT: 'LOFT',
    HOUSE: 'HOUSE',
    DUPLEX: 'DUPLEX',
    MANUFACTURED: 'MANUFACTURED',
    IN_LAW: 'IN_LAW',
    CONDO: 'CONDO',
    CABIN: 'CABIN',
    TOWN_HOUSE: 'TOWN_HOUSE',
  },
  labels: {
    IN_UNIT: 'Yes, in-unit',
    ON_SITE: 'Yes, on-site',
    IN_BUILDING: 'Yes, in-building',
    HOOKUPS: 'Hookups available',
    APARTMENT: 'Apartment',
    LOFT: 'Loft',
    HOUSE: 'House',
    DUPLEX: 'Duplex',
    MANUFACTURED: 'Manufactured',
    IN_LAW: 'In-law Apartment',
    CONDO: 'Condo',
    CABIN: 'Cabin',
    TOWN_HOUSE: 'Townhouse',
    STREET: 'Yes, on-street',
    OFF_STREET: 'Yes, off-street',
    GARAGE_ATTACHED: 'Yes, attached garage',
    GARAGE_DETACHED: 'Yes, detached garage',
    CARPORT: 'Yes, carport',
    VALET: 'Yes, valet',
  }
}


// save params unique to craigslist listings.
// this lets us keep a permanent record of source data,
// while storing derived/translated data at the top
// level of the record
export const CraigslistData = Immutable.Record({
  area: null, // CL defined section, eg, 'Boston'
  subArea: null, // area of a city/state, eg, 'mnh' for Manhattan
  siteCategory: null, // an acronym for names like 'no fee broker,', 'apartments by owner'
  id: null,
  dateListingUpdated: null,
  dateListingCreated: null,
  // usually an intersection, sometimes street address ('27 John St')
  mapAddress: null,
  // sometimes city, but user-defined so can't rely on it for phys address
  locationInTitle: null,
})

// follows a google maps LatLng object pattern,
// with addition of 'accuracy' key, which is
// an int Craigslist uses to define the radius of
// the dot/circle they place on a map to denote a listing
// location. I don't know the specific formula, but it
// seems that higher accuracy (eg, 22) = bigger circle.
// which seems less accurate.  so, more to learn here.
export const CoordinatesRecord = Immutable.Record({
  lat: null,
  lng: null,
  accuracy: null,
})
export const AddressRecord = Immutable.Record({
  unit: null, // 3, i.e., apt 3, unit 3, etc.
  streetNumber: null,
  streetName: null,
  city: null,
  state: null,
  zip: null,
})

export const ListingRecord = Immutable.Record({
  listingID: null,
  dateAvailable: null,
  craigslistData: null,
  adURL: null,
  adBody: null,
  contactName: null,
  contactPhone: null,
  contactEmail: null,
  price: null,
  realtorFee: null,
  deposit: null,
  adTitle: null,
  squareFeet: null,
  baths: null,
  beds: null,
  address: null,
  coordinates: null,
  images: null,
  dwellingType: null,
  parkingType: null,
  parkingQuantity: null,
  laundryType: null,
  catsPermitted: null,
  dogsPermitted: null,
  wheelchairAccessible: null,
  smokingProhibited: null,
  furnished: null,
  // \room/bath status in 'rooms for rent' listings
  roomIsPrivate: null,
  bathIsPrivate: null,
})

class Listing extends ListingRecord {

  getLocation() {
    return this.getIn(['craigslistData', 'locationInTitle'], null)
  }
  getListingName() {
    const name = this.get('adTitle') || 'Untitled'
    return ({
      full: name,
      truncated: name.slice(0, 20) + '...'
    })

  }
}

export const makeListingRecord = (listObj) => {
  /***
   * convert regular .js listing obj into a proper
   * listing record. have to do this vice simply
   * invoking `new Listing(obj)` since Record constructor
   * won't convert nested nodes into records/lists
   ***/

  let formatted = {...listObj }
  if (Array.isArray(listObj.images) === true) {
    formatted.images = Immutable.List(listObj.images)
  }
  if (listObj.hasOwnProperty('address') === true) {
    formatted.address = new AddressRecord(listObj.address)
  }
  if (listObj.hasOwnProperty('craigslistData') === true) {
    formatted.craigslistData = new CraigslistData(listObj.craigslistData)
  }
  if (listObj.hasOwnProperty('coordinates') === true) {
    formatted.coordinates = new CoordinatesRecord(listObj.coordinates)
  }
  return new Listing(formatted)
}


export default Listing;
