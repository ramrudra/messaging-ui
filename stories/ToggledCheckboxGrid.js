import React from 'react'
import { action, storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { customMuiTheme } from '../src/lib/styles/customMUITheme.js'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ToggledCheckboxGrid from '../src/components/ToggledCheckboxGrid'
import Immutable from 'immutable'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin()

//jest.mock('material-ui/Toggle')

const laundry = Immutable.Map({
  IN_UNIT: false,
  IN_BUILDING: false,
  HOOKUPS_AVAIL: false,
  NONE: false,
  SOME: true,
  STACKED: false,
  THESE_ARE_FAKE: true
})

const laundryFalse = laundry.map((type) => { return false })

const labels = {
  IN_UNIT: "In-Unit",
  IN_BUILDING: "In-Building",
  HOOKUPS_AVAIL: "Hookups Avail.",
  NONE: "None",
  SOME: "Some",
  STACKED: "Stacked",
  THESE_ARE_FAKE: "These are fake"
}

storiesOf('Toggleable Checkbox Grid', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme(customMuiTheme)}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('1 or more values checked', _ => (
    <div style={{ padding: '30px', width: '200px', }}>
      <ToggledCheckboxGrid
        fieldName="Laundry"
        filterCategory='laundryFilterSettings'
        labels={labels}
        fieldValues={laundry}
        handleCheckClick={action('Check clicked')}
        />
    </div>
  ))
  .add('No values checked', _ => (
    <div style={{ padding: '30px', width: '200px', }}>
      <ToggledCheckboxGrid
        fieldName="Laundry"
        filterCategory='laundryFilterSettings'
        labels={labels}
        fieldValues={laundryFalse}
        handleCheckClick={action('Check clicked')}
        />
    </div>
  ))
