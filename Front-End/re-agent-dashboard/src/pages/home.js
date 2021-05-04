import React, { Component } from 'react'

export default class home extends Component {
    
    render() {
        document.title = "RE-Agent Dashboard Home";
        return (
            <div>
                <h1>Welcome to Re Agent-Dashboard</h1>
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg" alt="home-img" height="800" width="1000"></img>
            </div>
        )
    }
}
