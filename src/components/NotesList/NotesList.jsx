// @flow
import React from 'react'
import { List } from 'material-ui/List'
import { FixedListItem } from '../FixedMenuItem/FixedMenuItem.jsx'
import Immutable from 'immutable'
import Divider from 'material-ui/Divider'
import dateFormat from 'dateformat'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SwipeableViews from 'react-swipeable-views'
import FAB from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import NoteEditor from './NoteEditor.jsx'
import type { List as ListType } from 'immutable'

type Props = {
  listingNotes: ListType,
  noteSaveHandler: Function,
  noteDeleteHandler: Function
}

type State = {
  isEditorVisible: boolean,
  clickedNoteIndex: number,
  isNewNote: boolean,
}
export class NotesList extends React.Component {
  static defaultProps = {
    ...NotesList.defaultProps,
    listingNotes: Immutable.List([])
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      isEditorVisible: false,
      clickedNoteIndex: -1,
      isNewNote: false,
    }
const self: any = this;( self: any).shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  state: State

  openEditor = (clickedNoteIndex: number) => {
    this.setState({ clickedNoteIndex, isEditorVisible: true })
  }

  closeEditor = () => {
    this.setState({ isEditorVisible: false, isNewNote: false })
  }

  editNewNote = () => {
    this.setState({ isEditorVisible: true, isNewNote: true })
  }

  saveNewNote = (noteBody: string) => {
    this.props.noteSaveHandler(noteBody)
  }

  deleteNote = (noteID: string) => {
    this.props.noteDeleteHandler(noteID)
  }

  render() {
    const style = this.getStyles()
    return (
      <div>
        <SwipeableViews
          animateHeight
          disabled
          index={Number(this.state.isEditorVisible)}
        >
          <div>
            <div style={style.noteListContainer}>
              {this.renderNotesList(style) }
            </div>
            <FAB
              style={style.addNoteButton}
              onTouchTap={this.editNewNote}
              mini
              secondary
            >
              <AddIcon color={'white'} />
            </FAB>
          </div>
            <div style={style.noteListContainer}>
            {this.renderNoteEditor() }
          </div>
        </SwipeableViews>

      </div>
    )
  }

  renderNotesList(style: Object) {
    const notes = this.props.listingNotes
    if (notes === null || notes.size === 0) {
      return (
        <div style={style.noNotesMessage}>
          Notes are a great way to remember details about a home.
          <br /><br />
          Click the add button to get started.
        </div>
      )
    }
    return (
      <List>
        {notes.map((note, key) => {
          return (
            <div key={key}>
              <FixedListItem
                onTouchTap={() => { this.openEditor(key) }}
                primaryText={dateFormat(note.get('date'), 'd mmm')}
                secondaryText={'You wrote: ' + note.get('body')}
                secondaryTextLines={1}
              />
              <Divider />
            </div>
          )
        })
        }
      </List>

    )
  }
  renderNoteEditor() {
    const noteIndex = this.state.clickedNoteIndex
    const notes = this.props.listingNotes
    const selectedNote = this.state.isNewNote || !notes ? null
      : notes.get(noteIndex)
    return (
      <NoteEditor
        uid={this.props.uid}
        deleteNote={this.deleteNote}
        note={selectedNote}
        closeEditor={this.closeEditor}
        saveNewNote={this.saveNewNote}
      />
    )
  }

  getStyles = () => {
    const styles = {
      noteListContainer: {
        overflowY: 'auto',
        position: 'relative',
        height: '130px'
      },
      addNoteButton: {
        margin: 0,
        right: 20,
        top: '82px',
        left: 'auto',
        position: 'fixed',
      },
      noNotesMessage: {
        padding: '10px',
        textAlign: 'center',
      }
    }
    return styles
  }
}

export default NotesList

