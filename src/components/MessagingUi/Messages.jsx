import React from 'react';

type Props = {
  messages: array
};



class Messages extends React.Component {
  constructor(props: Props) {
    super(props)
  }

  render () {
    const { messages } = this.props;
    return (
      <div>
        {messages.map((message, i) => <div key={i} style={ style } className="message">{message}</div> )}
      </div>
    );
  }
}

export default Messages;

const style = {
  maxWidth: '75%',
  position: 'relative',
  width: 'auto',
  height: 'auto',
  textAlign: 'left',
  lineHeight: '1.25',
  backgroundColor: '#E1F5FE',
  borderRadius: '10px',
  boxShadow: '1px 1px 2px #9E9E9E',
  padding: '10px',
  marginBottom: '10px'
};

