import React from 'react'
import dateFormat from 'dateformat'

type Props = {
  /**  name to display beneath value, eg, "Price"*/
  // note that value isn't really optional, but it's nullable and
  // the flow -> proptypes babel plugin is having trouble parsing that
  values: { label: String, value?: ?Number | ?String | ?Date }[],
    /**  format the value label*/
    labelStyle: Object,
      /**  Format the container (i.e., the row)*/
      containerStyle: Object,
        /**  format the value (text, etc. - currency formatting is
         * handled by functions, dates should be formatted before passing*/
        valueStyle: Object,
          /**  If true, format value as currency*/
          isCurrency ?: Boolean,
          /**  If true, format value as date*/
          isDate ?: Boolean,

}
export class FeatureRow extends React.Component {
  props: Props;

  getStyles = () => {
    const styles = {
      fieldLabel: {
        fontSize: '1.5em',
        opacity: 0.6,
        display: 'block',
        margin: 0,
        marginTop: '2px',
      },
      wrapper: {
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'space-between',
        justifyContent: 'space-around',
        fontSize: '1.3em',
      },
      featureBox: {
      },
      h6: {
        // TODO this should come from globa styles but it's not
        // for some reason
        margin: 0,
        opacity: 0.6,
      }
    }
    styles.fieldLabel = {...styles.fieldLabel, ...this.props.labelStyle }
    styles.wrapper = {...styles.wrapper, ...this.props.containerStyle }
    styles.value = {...styles.value, ...this.props.valueStyle }
    styles.featureBox = {...styles.featureBox, ...this.props.featureBoxStyle }
    return styles
  }

  formatFeature = (feature) => {
    if (feature.value === null || typeof feature.value === 'undefined') {
      return '?'
    }

    if (feature.isDate === true) {
      return dateFormat(feature.value, 'd mmm')
    }

    if (feature.hasOwnProperty('url')) {
      let url = feature.url
      if (url.indexOf('http') === -1) url = "http://" + url
      return (<a href={url} target='_blank'>{feature.value}</a>)
    }
    if (feature.isCurrency === true) {
      let price = feature.value.toLocaleString('en-US',
        {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        })
      let fee = !feature.fee ? '' : ' + fee'
      return price + fee
    }

    return feature.value
  }

  render() {
    const style = this.getStyles()
    return (
      <div style={style.wrapper}>
        {this.props.values.map((feature, i) => {
          return (
            <div style={style.featureBox} key={i}>
              {
                this.formatFeature(feature)
              }
              <span style={style.fieldLabel}>
                <h6 style={style.h6}>{feature.label}</h6>
              </span>
            </div>
          )
        })}
      </div>
    )
  }
}
FeatureRow.defaultProps = {
  labelStyle: {},
  containerStyle: {},
  valueStyle: {},
}

export default FeatureRow

