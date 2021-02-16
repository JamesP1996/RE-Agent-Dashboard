import React from "react";
import Houses from "./Houses";
import axios from 'axios';
import '../../App.css';

class GetHouses extends React.Component
{
    // Make an Empty Array State for Notes
    state = {
        houses: []
    }

    // Grab the Note Data from Backend when this component is mounted
    componentDidMount(){
        axios.get('/open_houses')
            .then((response)=>{
                this.setState({houses: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        return (
            <div id="listingread">
                <div id="listingData">
                    <h1>Houses</h1>
                    <ul id="ListParent">
                        <Houses myHouses={this.state.houses}></Houses>
                    </ul>
                </div>
            </div>
        );
    }

}
export default GetHouses;