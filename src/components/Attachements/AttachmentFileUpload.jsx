import React from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../../firebaseConfig';
import Dropzone from 'react-dropzone'
import RaisedButton from 'material-ui/RaisedButton';

class AttachmentFileUpload extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  // componentDidMount() {
  //   firebase.initializeApp(firebaseConfig);
  // }

  onDrop(file) {
    let attachements = this.state.files;
    attachements.push(file);
    this.setState({files: attachements});
    console.log(file);
  }

  onUpload() {
    const files = this.state.files;
    files.forEach((file) => {
      firebase.initializeApp(firebaseConfig);
      const storageRef = firebase.storage().ref();
      const messagesRef = storageRef.child('test/' + file[0].name);
      messagesRef.put(file[0]).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });
    });

  }

  render() {
    const files = this.state.files;

    if(files.length > 0) {
      return (
        <div>
          <Dropzone onDrop={this.onDrop.bind(this)}>
            {files.map((img, i) => <img height="60" style={{ margin: "5px" }} key={i} src={img[0].preview} /> )}
          </Dropzone>
          <div>
            <RaisedButton onClick={this.onUpload.bind(this)} label="Default" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <div>Drag your files here or click to browse.</div>
          </Dropzone>
        </div>
      );
    }


  };
}
export default AttachmentFileUpload;
