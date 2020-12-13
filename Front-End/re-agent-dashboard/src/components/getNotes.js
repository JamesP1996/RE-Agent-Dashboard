import React,{Component} from 'react';

import axios from 'axios';

class getNotes extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    axios.get(`/notes`)
      .then(res => {
        const notes = res.data;
        this.setState({ notes });
      })
  }

  render() {
    return (
      <ul>
        { this.state.notes.map(note => <li>{note.title}</li>)}
      </ul>
    )
  }
}

export default getNotes;