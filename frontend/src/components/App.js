import React, { Component } from "react";
import { render } from "react-dom";
import ListMembers from "./ListMembers";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <ListMembers />
        </div>
        );
    }
} 

const appDiv = document.getElementById('app');
render (<App />, appDiv)