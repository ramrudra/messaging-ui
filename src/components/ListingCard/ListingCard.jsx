// @flow
import React from 'react'
import { browserHistory } from 'react-router'
import type { List, Map } from 'immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import ViewListingIcon from 'material-ui/svg-icons/action/open-in-new'
import IconButton from 'material-ui/IconButton'
import ListingTabs from './ListingTabs.jsx'
import ListingImages from './ListingImages.jsx'
import RatingStars from '../RatingStars'
import TagArray from '../TagArray'


type Props = {
  modifyNote: Function,
  createNote: Function,
  deleteNote: Function,
  rateListing: Function,
  addTag: Function,
  removeTag: Function,
  trackCardTabClicked: Function,
  trackPictureZoomed: Function,
  userNotes: List,
  listingID: string,
  listing: Object,
  uid: string,
  listingRating: number,
  listingTags: Map<string, boolean | number>,
  activeTabName: string
};

type State = {
  isMouseOver: boolean,
  isLightboxOpen: boolean,
  lightboxCurrentImage: number,
  zDepth: number
}


export class ListingCard extends React.Component {
  constructor(props: Props) {
    super(props)
    const self: any = this;
    (self: any).shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  state = {
    isMouseOver: false,
    isLightboxOpen: false,
    lightboxCurrentImage: 0,
  }
  state: State

  handleMouseEnter = (event: SyntheticMouseEvent) => {
    /* change zDepth to make card hover on mouseover*/
    this.setState({ zDepth: 4, isMouseOver: true })
  }
  handleMouseLeave = () => {
    this.setState({ zDepth: 1, isMouseOver: false })
  }

  handleNoteSave = (noteBody: string, noteID: ?string = null) => {
    const { createNote, modifyNote } = this.props
    const { listingID } = this.props
    /* note IDs are generated when note is written to database, so noteID === null
    means it's a new note */
    if (noteID === null) {
      createNote(listingID, noteBody)
    } else {
      modifyNote(listingID, noteID, noteBody)
    }
  }

  handleNoteDelete = (noteID: string) => {
    const { listingID } = this.props
    this.props.deleteNote(listingID, noteID)
  }

  handleListingRating = (rating: number) => {
    /* fired when user clicks stars to emit new rating*/
    const { listingID } = this.props
    const uid = this.props.uid
    this.props.rateListing(listingID, rating, uid)
  }

  handleAddTag = (tagName: string) => {
    const { listingID, uid } = this.props
    this.props.addTag(listingID, tagName, uid)
  }

  handleRemoveTag = (tagName: string) => {
    const { listingID } = this.props
    this.props.removeTag(listingID, tagName)
  }

  handleListingFocus = () => {
    /* navigate to a single-listing view, instead of a grid of all listings */
    browserHistory.push('/listings/' + this.props.listingID)
  }

  render() {
    const style = this.getStyles()
    const { listing } = this.props
    return (
      <Card
        id={listing.get('listingID')}
        zDepth={this.props.isSelected ? 0 : this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={style.card}
      >
        <CardHeader
          style={style.cardHeader}
        >
          <div style={style.headerTextContainer}>
            {listing.getListingName().truncated}
          </div>
          <div style={style.goToListingButton}>
            <IconButton
              onTouchTap={this.handleListingFocus}
            >
              <ViewListingIcon />
            </IconButton>
          </div>
          <RatingStars
            listingRating={this.props.listingRating}
            updateRating={this.handleListingRating}
            style={style.stars}
            starStyle={{ height: '30px', width: '30px', }}
          />
        </CardHeader>
        <ListingImages
          listingID={this.props.listingID}
          trackPictureZoomed={this.props.trackPictureZoomed}
          handleToggleLightbox={this.props.handleToggleLightbox}
          imageURLs={listing.get('images') || undefined}
          showThumbnails={this.state.isMouseOver}
        />
        <ListingTabs
          trackCardTabClicked={this.props.trackCardTabClicked}
          listing={this.props.listing}
          uid={this.props.uid}
          noteDeleteHandler={this.handleNoteDelete}
          noteSaveHandler={this.handleNoteSave}
          listingNotes={this.props.userNotes}
          activeTabName={this.props.activeTabName}
        />
        <CardActions>
          <Divider />
          <TagArray
            handleAddTag={this.handleAddTag}
            handleRemoveTag={this.handleRemoveTag}
            listingTags={this.props.listingTags}
            listingID={this.props.listingID}
          />
        </CardActions>
      </Card>
    )
  }

  getStyles() {
    const styles = {
      card: {
        border: 'none',
        boxSizing: 'border-box',
        width: '300px',
        transition: 'width 1.5s',
        height: '510px',
        margin: '15px',
        position: 'relative',
      },
      cardHeader: {
        paddingTop: 0,
        paddingBottom: '5px',
        textAlign: 'left',
      },
      headerTextContainer: {
        marginTop: '-10px',
        fontSize: '1.3em',
        fontWeight: '700',
      },
      stars: {
        display: 'inline-block',
      },
      goToListingButton: {
        right: 0,
        position: 'absolute',
        marginRight: '-10px',
        marginTop: '-40px',
        transition: 'opacity .3s ease-in-out',
        // use opacity here instead of display b/c popups that anchor to CardActions
        // lose their anchor when display transitions to 'none'
        opacity: this.context.isMobile === true || this.state.isMouseOver === true ? 1 : 0,
      },
      checkButton: {
        position: 'absolute',
        zIndex: 10000,
        marginTop: '-20px',
        marginLeft: '-20px',
        transform: this.state.isMouseOver === true ? 'scale(1,1)' : 'scale(0,0)',
        transition: 'all .2s',
      },
      checkButtonColor: 'rgba(128, 128, 128, .5)',
      tagTray: {
        flexFlow: 'row nowrap',
        paddingTop: '7px',
      },
      tagsExpandButton: {
        position: 'absolute',
        right: '-2px',
        bottom: '-6px',
      }
    }
    return styles
  }
}
ListingCard.contextTypes = {
  isMobile: React.PropTypes.bool
}

export default ListingCard
