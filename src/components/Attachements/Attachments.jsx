import React from 'react';
import AttachIcon from 'material-ui/svg-icons/editor/attach-file';
import Popover from 'material-ui/Popover/Popover';
import AttachmentFileUpload from './AttachmentFileUpload';

export default class Attachments extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <p style={{lineHeight: '24px', textAlign: 'right', color: '#828282', cursor: 'pointer', marginBottom: 0}} onClick={this.handleTouchTap}><AttachIcon style={{verticalAlign: 'bottom', color: '#828282'}} /> Attachement</p>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal:"right",vertical:"top"}}
          targetOrigin= {{horizontal:"left",vertical:"bottom"}}
          onRequestClose={this.handleRequestClose}
        >
         <AttachmentFileUpload />
        </Popover>
      </div>
    );
  }
}
