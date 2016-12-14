import React from 'react'
import Chip from 'material-ui/Chip'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AddIcon from 'material-ui/svg-icons/content/add'
import Immutable from 'immutable'
import MoreArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'

type Props = {
  // buttonStyle: ,
  // tagTrayStyle: ,
  // handleAddTag: ,
  // listingID: ,
  // expandIcon: ,
  // actionButton: ,
  // userTags: ,
  // listingTags: ,
  // title?: ,
}


// TODO long tags will overflow right

export class TagEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tagSearchText: null,
      autocompleteData: [],
    }
const self: any = this;( self: any).shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }





  filterInput = (searchText, key) => {
    // this is the 'fuzzy filter' included w/ MUI Autocomplete,
    // slightly mod'd to always return the item that lets users add new tag

    // this works b/c the 'add new' item has a distinct blank text string, ie, ''
    // adding a non-blank ID results in the value populating the textArea after
    // user clicks. no obvious non-hacky way to undo that, but this does the trick

    if (key === '') return true


    let compareString = key.toLowerCase()
    searchText = searchText.toLowerCase()

    let searchTextIndex = 0
    for (let index = 0; index < key.length; index++) {
      if (compareString[index] === searchText[searchTextIndex]) {
        searchTextIndex += 1
      }
    }

    return searchTextIndex === searchText.length
  }

  makeDropdownValues = (allUserListingTags, listingTags) => {
    // make menu items from our list of tags
    let resultsList = allUserListingTags
      // remove tags the listing already contains
      .filter((tag) => { return (!listingTags.contains(tag)) })
      // format tag data for the autocomplete box
      .map((tag) => { return ({ text: tag, value: tag }) })

    // if user hasn't entered text, return our menu items
    if (this.state.tagSearchText == null) return resultsList.toArray()

    // if they have entered text, create an 'add new tag' option @ bottom of list
    const addNewMenuItem = (<MenuItem
      style={{ borderTop: '1px solid gray' }}
      leftIcon={<AddIcon />}
      primaryText={'Create: "' + this.state.tagSearchText + '"'}
      />)

    // the stock MUI autocomplete component lacks an option
    // to place an 'add new' button in the bottom of the results
    // dropdown, so we'll construct a data set from user tags and
    // append an 'add' component to the end of the list,
    // then modify the filter function to always return our component
    let addNewTag = { text: '', value: (addNewMenuItem) }

    return (
      resultsList
        .push(addNewTag)
        .toArray()
    )
  }


  handleTagDropdownItemSelect = (selection) => {
    let tagName
    // if it's an object, then the user selected a menu item
    if (typeof selection === 'object') {
      // if text is '', then they clicked the 'add new tag'
      // otherwise, grab tag name from state
      tagName = selection.text === '' ? this.state.tagSearchText : selection.value
    } else {
      // otherwise, if value passed is a string, user pressed
      // 'enter' in the search box, and we can just use what they typed
      tagName = selection
    }
    // reset search text
    if (this.state.isOpen === true) this.setState({ isOpen: false })
    this.handleAddTag(tagName)
  }

  handleTagSearchUpdate = (searchText) => {
    // this permits us to capture the user's search-text if they click 'add new'
    this.setState({ tagSearchText: searchText })
  }

  handleAddTag = (tagName) => {
    this.props.addTag(this.props.listingID, tagName, this.props.uid)
    this.setState({ tagSearchText: null })
  }
  handleRequestDelete = (tagName) => {
    this.props.removeTag(this.props.listingID, tagName)
  }
  // TODO this should have both the add button & the 'more'

  render() {
    const style = this.getStyles()
    const dropdownValues = this.makeDropdownValues(
      this.props.allUserListingTags,
      this.props.listingTags)

    return (
      <div style={style.wrapper}>
        <h3>{this.props.title}</h3>
        <AutoComplete
          hintText="Enter a tag name"
          floatingLabelText="Add a tag"
          filter={this.filterInput}
          openOnFocus
          dataSource={dropdownValues}
          listStyle={style.autocompleteMenu}
          onUpdateInput={this.handleTagSearchUpdate}
          onNewRequest={this.handleTagDropdownItemSelect}
          />
        <div style={style.popoverContent}>
          <TagArray
            chipStyle={style.popoverChips}
            containerStyle={style.chipsContainer}
            tags={this.props.listingTags}
            handleRequestDelete={this.handleRequestDelete}
            />

        </div>
      </div>
    )
  }

  getStyles() {
    const styles = {
      wrapper: {
        display: 'flex',
        flexFlow: 'column nowrap',
        maxWidth: '300px',
      },
      popoverContent: {
      },
      autocompleteMenu: {
        WebkitAppearance: 'none',
        maxHeight: '200px',
        width: '250px',
        overflowY: 'auto',
        overflowX: 'hidden'
      },
      chipsContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
      },
      popoverChips: {
        margin: '5px',
      },
      title: {
        padding: 0,
        margin: 0,
      }
    }

    // merge in props styles
    styles.buttonStyle = Object.assign({}, styles.buttonStyle, this.props.buttonStyle)
    styles.tagPreviewChips = Object.assign({}, styles.tagPreviewChips, this.props.tagTrayStyle)

    return styles
  }
}

const TagArray = (props) => {
  if (!props.tags) return null
  // grab all non-system-generated tags
  const tags = [...props.tags.filter(tag => tag !== 'SYSTEM').keys()]
  return (<div style={props.containerStyle}>
    {tags.map((tag, key) => {
      return (
        <TagChip
          key={key}
          style={props.chipStyle}
          handleRequestDelete={props.handleRequestDelete}
          tag={tag}
          />
      )
    })
    }
  </div>
  )
}

// making tag to pass args properly to methods, only place
// this component will see action so not making new file for now
// eslint-disable-next-line react/no-multi-comp
const TagChip = (props) => {
  const handleRequestDelete = () => {
    props.handleRequestDelete(props.tag)
  }
  return (
    <Chip
      style={{...props.style, WebkitAppearance: "none", }}
      onRequestDelete={handleRequestDelete}
      >
      {props.tag}
    </Chip>
  )
}



export default TagEditor

