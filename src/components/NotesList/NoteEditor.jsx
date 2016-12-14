import React from 'react'
import dateFormat from 'dateformat'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import IconSave from 'material-ui/svg-icons/content/save'
import IconEdit from 'material-ui/svg-icons/editor/mode-edit'
import IconBack from 'material-ui/svg-icons/navigation/arrow-back'
import IconDelete from 'material-ui/svg-icons/action/delete'
import { Palette } from '../../lib/styles/colorPalette.js'

type Props = {

};

type State = {

}
// TODO conditionalize showing 'edit' btn on confirming author is current user UID
export class NoteEditor extends React.Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      noteText: '', // seeding value for textField
    }
  }
  state: State

  handleNoteEdit = (event) => {
    this.setState({ noteText: event.target.value })
  }


  handleNoteSave = () => {
    console.log('save', this.state.noteText)
    this.props.saveNewNote(this.state.noteText)
    this.setState({ noteText: '' })
    this.props.closeEditor()
  }

  handleCancel = () => {
    this.props.closeEditor()
    this.setState({ noteText: '' })
  }

  handleDelete = () => {
    const noteID = this.props.note.get('noteID')
    this.props.deleteNote(noteID)
    this.props.closeEditor()
  }
  render() {
    const style = this.getStyles()
    return (
      <div style={style.wrapper}>
        {this.props.note == null ?
          this.renderNoteEdit(style) : this.renderNoteContent(style)
        }
      </div>
    )
  }

  renderNoteEdit (style) {
  return (
    <div>

    <div style={style.textArea}>
      <TextField
        fullWidth
        hintText={'Type your note here. Notes are visible to every user in your Wayhome.'}
        id={'note-edit-dialog'}
        onChange={this.handleNoteEdit}
        value={this.state.noteText}
        multiLine
        rows={3}
      />
    </div>
     <div style={style.buttonRow}>
    <FlatButton
      label='Cancel'
      onTouchTap={this.handleCancel}
    />
    <FlatButton
      label='Save'
      primary
      disabled={(this.state.noteText === '')}
      onTouchTap={this.handleNoteSave}
    />
  </div>
    </div>
  )
}

  renderNoteContent(style) {
  return (
    <div>
      <div style={style.buttonRow}>
        <FlatButton

          label={<IconBack color={Palette.accent} style={style.buttonIcon} />}
          onTouchTap={this.handleCancel}
        />
        {this.props.uid === this.props.note.get('authorUID') ?

          <FlatButton
            label={<IconDelete
              color={Palette.accent}
              style={style.buttonIcon}
            />}
            onTouchTap={this.handleDelete}
          />
          : null
        }
      </div>
      <div style={style.existingNoteContent}>
        {this.props.note.get('body') }
      </div>
    </div>
  )
}
  getStyles = () => {
    const styles = {
      wrapper: {
        width: '95%',
        height: '100%',
      },
      buttonRow: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-around',
      },
      buttonIcon: {
        marginBottom: '-7px'
      },
      textArea: {
        paddingLeft: '15px',
        //paddingTop: '15px',
      },
      existingNoteContent: {
        paddingLeft: '15px',
        paddingTop: '15px',
      }
    }
    return styles
  }
}


export default NoteEditor

