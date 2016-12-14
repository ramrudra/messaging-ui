import React from 'react'
import ListingCard from '../src/components/ListingCard'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import { makeListingRecord } from '../src/lib/models/source-listing-record'
import 'storybook-addon-material-ui'
import { muiTheme } from 'storybook-addon-material-ui'
import { customMuiTheme } from '../src/lib/styles/customMUITheme.js'
import Immutable from 'immutable'

storiesOf('Listing Card', module)
  .addDecorator(muiTheme([customMuiTheme]))
  .add('default state', () => (
    <div>
      <ListingCard
        id={'123456'}
        uid={'123456'}
        listingID={'123456'}
        handleToggleLightbox={action('lightbox-toggled')}
        modifyNote={action('note-modified')}
        createNote={action('note-created')}
        listing={listingData}
        modifyNote={action('modifyNote')}
        createNote={action('createNote')}
        deleteNote={action('deleteNote')}
        rateListing={action('rateListing')}
        addTag={action('addTag')}
        removeTag={action('removeTag')}
        trackCardTabClicked={action('trackCardTabClicked')}
        trackPictureZoomed={action('trackPictureZoomed')}
        listingRating={5}
        listingTags={Immutable.Map({})}
        />
    </div>
  ))


const listingData = makeListingRecord({
  'adBody': '\nContact info:Aj Arstamyan | \n show contact info\n| \n show contact info\n  GORGEOUS LOFT with 2 parking SPACES and prvt deck156 Porter St, Boston, MA 02128$2,500/mo KEY FEATURESSq Footage:  780 sqft.Bedrooms:  1 BedBathrooms:  1 BathParking:  2 GarageLease Duration:  1 Year (See Details Below)Deposit:  $2,500Pets Policy:  Cats OKLaundry:  In UnitFloor:  PHProperty Type:  ApartmentDESCRIPTIONTerrific open loft with sleeping alcove, 797 square feet, wall to wall windows, central air and heat enormous private deck, two car garage parking also a common roofdeck and club room.available 7/1RENTAL FEATURESLiving roomBreakfast nookDishwasherMicrowaveGarbage disposalStainless steel appliancesFreezerBalcony, Deck, or PatioPorchHeat: forced airCentral A/CDouble pane / Storm windowsCable-readyHigh-speed internetWiredIntercom systemHardwood floorCOMMUNITY FEATURESControlled accessDoormanNear transportationGarage - AttachedLEASE TERMSNO DOGSContact info: Aj Arstamyan \n show contact info\n\n show contact info\n     ',
  'adTitle': 'LOFT WITH 2 GARAGE PARKING SPACES AND DECK****************************',
  'address': {
    state: 'Massachusetts'
  },
  baths: 1,
  beds: 1,
  'catsPermitted': true,
  'coordinates': {
    accuracy: '7',
    'lat': '42.370720',
    'lng': '-71.031590'
  },
  craigslistData: {
    'area': 'boston',
    dateListingCreated: 1474300370,
    'dateListingUpdated': 1475079085,
    id: '5788816679',
    locationInTitle: 'East boston',
    'siteCategory': 'apts broker no fee',
    subArea: 'boston/camb/brook'
  },
  dogsPermitted: true,
  dwellingType: 'APARTMENT',
  images: [
    'https://firebasestorage.googleapis.com/v0/b/wayhome-4a86e.appspot.com/o/listingImages%2FaHR0cDovL2Jvc3Rvbi5jcmFpZ3NsaXN0Lm9yZy9nYnMvZmVlLzU4NTk3NjAxMTguaHRtbAIMG0.jpg?alt=media&token=812c10a0-ed0e-4387-860a-d2d1d9a6c111',
    'https://firebasestorage.googleapis.com/v0/b/wayhome-4a86e.appspot.com/o/listingImages%2FaHR0cDovL2Jvc3Rvbi5jcmFpZ3NsaXN0Lm9yZy9nYnMvZmVlLzU4NTk3NjAxMTguaHRtbAIMG1.jpg?alt=media&token=dbe15be1-98e3-4813-a2ae-236643040227',
    'https://firebasestorage.googleapis.com/v0/b/wayhome-4a86e.appspot.com/o/listingImages%2FaHR0cDovL2Jvc3Rvbi5jcmFpZ3NsaXN0Lm9yZy9nYnMvZmVlLzU4NTk3NjAxMTguaHRtbAIMG2.jpg?alt=media&token=b61289c7-fff9-49ef-b597-f826b091a1e0'
  ],
  laundryType: 'IN_UNIT',
  'listingID': 'aHR0cDovL2Jvc3Rvbi5jcmFpZ3NsaXN0Lm9yZy9nYnMvbmZiLzU3ODg4MTY2NzkuaHRtbA',
  parkingType: 'GARAGE_ATTACHED',
  price: 2500,
  'wheelchairAccessible': true
})
