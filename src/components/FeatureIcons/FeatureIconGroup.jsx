/* @flow*/
import React from 'react'
import type { Map } from 'immutable'

type Props = {
  /** style for entire row*/
  containerStyle: Object,
  /** style for each icon/label combo*/
  featureContainerStyle: Object,
  /** style for each icon*/
  iconStyle: Object,
  /** list of names of features we want to show. name should match key name in the
   * `listing` prop _AS WELL AS_ the .svg file in the static/feature-icons directory
   * eg 'beds' matches listing.get('beds') and 'static/feature-icons/beds.svg'
  */
  featuresList: String[],
  /** listing data of invoking parent*/
  listing: Map// TODO make listing record type,
};

export class FeatureIconGroup extends React.Component {
  props: Props;

// defaultprops as static prop required by flow
// https://github.com/facebook/flow/issues/1594

  static defaultProps = {
    containerStyle: {},
    featureContainerStyle: {},
    iconStyle: {},
  }


  render() {
    const style = this.getStyles()
    const featureIcons = makeFeatureIcons(this.props, style)

    return (
      <div style={style.featureIconRow}>
        {featureIcons}
      </div>
    )
  }
  getStyles = () => {
    const styles = {
    featureIconRow: {
        minWidth: '250px',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    featureIconBox: {
        display: 'flex',
        width: '40px',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '1.3em',
      },
    featureIcon: {
        width: '100%',
        display: 'inline',
      },

  }
    styles.featureIconRow = Object.assign({}, styles.featureIconRow, this.props.containerStyle)
    styles.featureIconBox = Object.assign({}, styles.featureIconBox, this.props.featureContainerStyle)
    styles.featureIcon = Object.assign({}, styles.featureIcon, this.props.iconStyle)

    return styles
  }

}


const makeFeatureIcons = (props, style) => {
  // list features we want in our icon row

  const { featuresList, listing } = props
  // return array of elements w/ icon and label
  return featuresList.map((name, i) => {
    // grab the value we'll show beneath the icon
    let label = listing.get(name, null)


    // depending on field type, we want to alter the label
    switch (typeof label) {
      case 'boolean': // dogs, cats, etc.
        label = label === true ? 'Yes' : 'No'
        break
      case 'number': // beds, baths
        break
      // Immutable returns null if we couldn't find a value, or the value was undefined/null
      // could lump in w/ default but want to be granular here just in case
      case 'object':
        if (label == null) { label = '?' }
        break
      default:
        label = '?'
        break
    }

    const labelStyle = name === 'squareFeet' ? { fontSize: '0.9em' } : {}
    const unitStyle = name === 'squareFeet' ? { fontSize: '0.8em', marginLeft: '1px' } : {}
    const labelOpacity = label === '?' ? 0.3 : 1
    return (

      <div key={i} style={{...style.featureIconBox, opacity: labelOpacity}}>
        <img style={style.featureIcon}
          src={require('../../static/feature-icons/' + name + '.svg')}
        />
        <span style={labelStyle}>
          {label}{name === 'squareFeet' && label !== '?' ? <span style={unitStyle}>ft<sup>2</sup></span> : null}
        </span>
      </div>
    )
  })
}

export default FeatureIconGroup

