import React from 'react'
import Rating from 'react-rating'
import { Palette } from '../../lib/styles/colorPalette.js'
import StarIcon from 'material-ui/svg-icons/action/grade'

type Props = {
  listingRating: number,
  updateRating: Function,
  style: Object,
  starStyle: Object
};

export class RatingStars extends React.Component {
  props: Props;

  handleRatingChange = (rate: number) => {
    this.props.updateRating(rate)
  }

  render() {
    const style = this.getStyles()
    return (
      <div style={style.wrapper}>
        <Rating
          empty={<StarIcon style={this.props.starStyle} color={'rgba(185,185,185,0.6)'} />}
          full={<StarIcon style={this.props.starStyle} color={Palette.accent} />}
          onChange={this.handleRatingChange}
          initialRate={this.props.listingRating}
        />

      </div>
    )
  }

  getStyles = () => {
    const styleProp = this.props.style ? this.props.style : {}

    const styles = {
      wrapper: {
        display: 'inline-block',
        margin: 0,
        ...styleProp
      }
    }
    return styles
  }
}

export default RatingStars

