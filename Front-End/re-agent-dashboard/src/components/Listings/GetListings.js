import React from "react";
import Listings from "./Listings";
import axios from 'axios';
import '../../App.css';

class GetListings extends React.Component
{
    // Make an Empty Array State for Listings
    state = {
        listings: []
    }

    // Grab the Listings Data from Backend when this component is mounted
    componentDidMount(){
        axios.get('/listings')
            .then((response)=>{
                this.setState({listings: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        return (
            <div id="listingread">
                <div id="listingData">
                    <h1>Listings</h1>
                    <ul id="ListParent">
                        <Listings myListings={this.state.listings}></Listings>
                    </ul>
                </div>
            </div>
        );
    }

}
export default GetListings;