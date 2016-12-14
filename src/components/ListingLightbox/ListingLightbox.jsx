// @flow

import React from 'react'
import Lightbox from 'react-images'
import type { List } from 'immutable'

type Props = {
  /** index of img user clicked to open lightbox*/
  initialImage: number,
  isOpen: bool,
  /** since opener method will be in parent, this is just to close it (and will take no args likely)*/
  toggleLightbox: (listingID?: string, index?: number) => void,
  /** arr of objs from mapStateToProps. the `src` is just a url*/
  listingImages: List<{ src: string }>,

}

/**
 * Lightbox that displays in an overlay when the prop isOpen is set to true
 */
export class ListingLightbox extends React.Component {
  state: { lightboxCurrentImage: number, listingImages: List<{ src: string }>, }

  constructor(props: Props) {
    super(props)
    this.state = {
      lightboxCurrentImage: 0,
      listingImages: []
    }
  }

  gotoPrevLightboxImage = () => {
    this.setState({ lightboxCurrentImage: this.state.lightboxCurrentImage - 1 })
  }
  gotoNextLightboxImage = () => {
    this.setState({ lightboxCurrentImage: this.state.lightboxCurrentImage + 1 })
  }


  componentWillReceiveProps = (newProps: Props) => {
    if (newProps.listingImages) {
      this.setState({
        lightboxCurrentImage: newProps.initialImage,
        listingImages: newProps.listingImages.map((img) => {
          return { src: img }
        }
        ).toArray()
      })
    }
  }
  handleCloseLightbox = () => {
    this.props.handleToggleLightbox()
    this.setState({
      lightboxCurrentImage: 0,
    })
  }
  render() {
    return (
      <div>
        <Lightbox
          images={this.state.listingImages}
          isOpen={this.props.isOpen}
          onClickPrev={this.gotoPrevLightboxImage}
          onClickNext={this.gotoNextLightboxImage}
          onClose={this.handleCloseLightbox}
          currentImage={this.state.lightboxCurrentImage}
        />
      </div>
    )
  }
}

/* const mapStateToProps = (state, ownProps) => {

  // if listingID hasn't been passed, the .map call below will throw
  // we return empty array to avoid propTypes warning in Lightbox component
  if (ownProps.listingID === '') return { listingImages: [] }

  let imgArray = state.userListings
    .getIn([ownProps.listingID, 'images'])
    .map((imgSrc) => { return { src: imgSrc } })
    .toArray()
  return {
    listingImages: imgArray

  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}*/

export default ListingLightbox
