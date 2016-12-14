import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Popover from 'material-ui/Popover'
import MoreArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconButton from 'material-ui/IconButton'
//import TagEditor from '../../routes/Dash/containers/TagEditorContainer.js'
import Chip from 'material-ui/Chip'
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-forward'

export class TagArray extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false, anchorEl: null,
    }
const self: any = this;( self: any).shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleOpenPopover = (event) => {
    // prevnet ghost clicks
    event.preventDefault()
    this.setState({
      isOpen: true,
      anchorEl: event.currentTarget
    })
  }
  handleClosePopover = () => {
    this.setState({
      isOpen: false,
      anchorEl: null,
    })
  }
  render() {
    const style = this.getStyles()

    return (
      <div style={style.wrapper}>
        {this.renderPreviewTags(this.props.listingTags, style)}
        <div style={style.popoverButton}>
          <IconButton
            onTouchTap={this.handleOpenPopover}
            >
            <MoreArrowIcon />
          </IconButton>
          <Popover
            open={this.state.isOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            targetOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            onRequestClose={this.handleClosePopover}
            >
            <div style={style.popoverTray}>
             {/* <TagEditor
                title={'Listing tags'}
                listingID={this.props.listingID}
                />
		*/}
            </div>
          </Popover>
        </div>
      </div>
    )
  }


  renderPreviewTags(tagsMap, style) {
    const tagPreview = []
    if (tagsMap == null) return null
    let letterCount = 0
    const maxCharsAcross = 20
    const tags = [...tagsMap.filter(t => t !== 'SYSTEM').keys()]
    tags.forEach((tag) => {
      letterCount += tag.length
      if (letterCount <= maxCharsAcross) {
        tagPreview.push(tag)
      }
    })

    return (
      <div style={style.tagPreviewTray}>
        {tagPreview.length > 0 ? tagPreview.map((tag) => {
          return (
            <Chip
              style={style.tag}
              labelStyle={style.tag}
              key={tag}
              >
              {tag}
            </Chip>
          )
        })
          : <span>Add a tag over here <ArrowIcon style={{ marginBottom: -7 }} /></span>
        }
      </div>
    )
  }


  getStyles() {
    const styles = {
      wrapper: {
        paddingTop: '10px',
      },
      tagPreviewTray: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-around',
        marginRight: '10px',
      },
      tag: {
        cursor: 'default',
        // fixing bug b/t Material-ui and normalize.css
        WebkitAppearance: 'none',
      },
      popoverButton: {
        position: 'absolute',
        right: '-9px',
        top: '10px',
      },
      popoverTray: {
        height: '400px',
        position: 'relative',
        width: '300px',
        padding: '20px',
      }
    }
    return styles
  }
}

export default TagArray

/*


          */
