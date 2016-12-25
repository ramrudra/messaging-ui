import React from 'react';
import TextField from 'material-ui/TextField';
import SendIcon from 'material-ui/svg-icons/content/send';
import Attchements from '../Attachements/Attachments';
import Messages from './Messages';


class MessagingForm extends React.Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentMessage: '',
      messages: []
    }
  }


  handleMessage(e) {
    this.setState({
      currentMessage: e.target.value
    })
  }

  sendMessage() {
   const newMessages = this.state.messages.concat(this.state.currentMessage);
    this.setState({
      currentMessage: '',
      messages: newMessages
    })
  }

  render () {
    const styles = {
      iconStyles: {
        color: '#828282',
        cursor: 'pointer'
      }
    };

    let messages = <img src={require('static/graphic-no-messages.svg')} />;

    if(this.state.messages.length > 0) {
      messages = <Messages messages={this.state.messages} />;
    }

    return (
      <div>
        {messages}
        <div style={{ background: '#eee', padding: '15px 5px'}}>
          <div style={{ background: '#fff', display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: 'center' }}>
            <TextField
              multiLine={true}
              value={this.state.currentMessage}
              onChange={this.handleMessage.bind(this)}
              style={{ background: '#fff', maxWidth: '75%', width: '100%' }}
              hintText="Type your message ..." />
            <SendIcon style={styles.iconStyles} onClick={this.sendMessage.bind(this)} />
          </div>
          <Attchements />
        </div>
      </div>
    );
  }
}

export default MessagingForm;
