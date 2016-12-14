// @flow
import type { List } from 'immutable'
import Immutable from 'immutable'
import React from 'react'
import { CardMedia } from 'material-ui/Card'
import PureRenderMixin from 'react-addons-pure-render-mixin'

type Props = {
  imageURLs: List,
  showThumbnails: Boolean,
  listingID: string,
  trackPictureZoomed: Function,
  handleToggleLightbox: Function
};

export class ListingImages extends React.Component {
  static defaultProps = {
    ...ListingImages.defaultProps,
    imageURLs: Immutable.List([require('static/no-image-image.svg')])
  }
  constructor(props: Props) {
    super(props)
    const self: any = this;
    (self: any).shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  handleImageClick = (event: SyntheticMouseEvent) => {
    this.props.trackPictureZoomed(this.props.listingID)
    const clickedImageIndex = Number(event.target.getAttribute('data-img-index'))
    this.props.handleToggleLightbox(this.props.imageURLs, clickedImageIndex)
  }
  render() {
    const style = this.getStyles()
    const { imageURLs } = this.props
    return (
      <div>
          <CardMedia
            mediaStyle={style.cardMedia}
            overlayContentStyle={style.cardMediaOverlayContent}
            overlayContainerStyle={style.cardMediaOverlayContainer}
            overlayStyle={style.cardMediaOverlay}
            overlay={<span style={style.cardMediaCarousel} >
              {imageURLs.map((pic, key) => {
                return (
                  // TODO work around this data- tag key retrieval
                  // eslint-disable-next-line jsx-a11y/no-static-element
                  <img
                    data-img-index={key}
                    alt={'a thumbnail of this listing'}
                    onClick={this.handleImageClick}
                    style={style.cardMediaThumbnail}
                    src={pic}
                    key={key}
                    />
                )
              })
              }
            </span>
            }
            >
            <img
              alt={"Original advertisement's photos"}
              style={{ maxHeight: '200px' }}
              src={imageURLs.first()}
              onClick={this.handleImageClick}
              />
          </CardMedia>
      </div>
    )
  }

  getStyles() {
    const styles = {
      cardMedia: {
        height: '200px', overflowY: 'hidden', verticalAlign: 'middle'
      },
      cardMediaCarousel: {
        display: 'flex', flexFlow: 'row-nowrap'
      },
      cardMediaOverlayContainer: {
        overflowY: 'hidden'
      },
      cardMediaOverlayContent: {
        background: 'rgba(0,0,0,1)',
        overflowX: 'auto'
      },

      // will transition b/t styles on card mouseOver
      cardMediaOverlay: {
        transition: 'all 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94)',
        transform: this.props.showThumbnails ? 'translateY(-90px)' : 'translateY(0px)',
        bottom: '-90px',
      },
      cardMediaThumbnail: {
        cursor: 'pointer', // to indicate that image is clickable
        marginRight: '4px',
        marginLeft: '4px',
        marginBottom: '5px',
        maxHeight: '60px'
      }
    }
    return styles
  }
}

export default ListingImages

