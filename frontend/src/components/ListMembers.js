import React, { Component } from "react";
import AddMember from "./AddMember";
import EditMember from "./EditMember";
import ListAllMembers from "./ListAllMembers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class ListMembers extends Component {
    constructor(props) {
        super(props);
    }

    render() {        
        return (
            <Router>
                <Switch>
                    <Route path='/list' component={ListAllMembers} />
                    <Route path="/add" component={AddMember} />
                    <Route path="/edit/:id" component={EditMember} />
                </Switch>
            </Router>
        );
    }
}