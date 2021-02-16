import React from "react";
import Notes from "./Notes";
import axios from 'axios';
import '../../App.css';

class GetNotes extends React.Component
{
    // Make an Empty Array State for Notes
    state = {
        notes: []
    }

    // Grab the Note Data from Backend when this component is mounted
    componentDidMount(){
        axios.get('/notes')
            .then((response)=>{
                this.setState({notes: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        return (
            <div id="noteread">
                <div id="noteData">
                    <h1>Notes</h1>
                    <ul id="ListParent">
                        <Notes myNotes={this.state.notes}></Notes>
                    </ul>
                </div>
            </div>
        );
    }

}
export default GetNotes;