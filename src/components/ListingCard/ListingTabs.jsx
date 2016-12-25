import React from 'react'
import type { List } from 'immutable'
import { Tabs, Tab } from 'material-ui/Tabs'
import NotesList from '../NotesList'
import FeatureIconGroup from '../FeatureIcons/FeatureIconGroup.jsx'
import FeatureRow from '../FeatureIcons/FeatureRow.jsx'
import MessagingForm from '../MessagingUi/MessagingForm'

type Props = {
  trackCardTabClicked: Function,
  listing: Object,
  uid: string,
  noteDeleteHandler: Function,
  noteSaveHandler: Function,
  listingNotes: List,
  activeTabName: string,
}

const ListingTabs = (props: Props) => {
  const style = getStyles(props)
  const handleTabClick = (tab) => {
    props.trackCardTabClicked(tab.props.label, props.listing.get('listingID', ''))
  }
  return (

    <Tabs
      inkBarStyle={{ backgroundColor: 'white', }}
      contentContainerStyle={style.tabBody}
      value={props.activeTabName}
      >
      {/*note that Tabs' value prop is mostly for dev purposes. if undefined, tabs are uncontrolled*/}
      <Tab
        label='Info'
        value="Info"
        onActive={handleTabClick}
        >
        <FeatureIconGroup
          featuresList={['beds', 'baths', 'squareFeet', 'dogsPermitted', 'catsPermitted']}
          listing={props.listing}
          containerStyle={style.featureIconGroup}
          />
        <FeatureRow
          values={[
            { label: 'Available', value: props.listing.get('dateAvailable', null), isDate: true },
            { label: 'Price', value: props.listing.get('price', null), isCurrency: true, fee: props.listing.get('realtorFee', null) },
          ]}
          containerStyle={style.featureRow}
          />
      </Tab>
      <Tab
        label='Notes'
        value="Notes"
        onActive={handleTabClick}
        >

        <div >
          <NotesList
            uid={props.uid}
            noteDeleteHandler={props.noteDeleteHandler}
            noteSaveHandler={props.noteSaveHandler}
            listingNotes={props.listingNotes}
            />
        </div>
      </Tab>
      <Tab
        value="Messages"
        label='Messages'
        onActive={handleTabClick}
        >
        <div style={{ textAlign: 'center' }}>
          <MessagingForm />
        </div>
      </Tab>
    </Tabs>
  )
}

const getStyles = (props) => {
  const styles = {
    tabs: {
      backgroundColor: '#039BE5'
    },
    tabBody: {
      height: '130px',
      overflowY: 'auto',
    },
    mainTabBody: {
      height: '120px',
    },
    featureIconGroup: {
      transform: 'scale(0.75, 0.75)'
    },
    featureRow: {
      justifyContent: 'space-around',
      transform: 'scale(0.75, 0.75)'
    },
  }
  return styles
}


export default ListingTabs
