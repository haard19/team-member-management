import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent } from "@material-ui/core";
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton';


export default class ListAllMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            DataisLoaded: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch("/backend/list")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    members: json,
                    DataisLoaded: true
                });
            })
    }

    handleClick(id){
        const hello = "hello";
        console.log(hello + id);
    }

    render() {
        const { DataisLoaded, members } = this.state;
        const lenMembers = members.length;
        const space = " ";
        const adminStr = "(admin)";
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;

        return (
            <Grid container spacing={1}>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="right">
                        <IconButton onClick={() => this.props.history.push("/add")}>
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography component="h4" variant="h4">
                            Team Members
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} align="center">  
                    <Typography component="h6" variant="h6">
                        You have {lenMembers} team members.
                    </Typography>   
                </Grid>
                    {
                        members.map((item) => (
                            <Grid item xs={12} align="center">
                                <Card id={item.id} variant="outlined" align="center">
                                    <CardContent id={item.id} align="center">
                                        <Typography variant="h6" gutterBottom>
                                            <Link 
                                                to={`/edit/${item.id}`} 
                                                state={{id: item.id}}>
                                                { item.role == false ? item.firstname + space +  item.lastname : item.firstname + space +  item.lastname + space + adminStr }
                                            </Link>
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            { item.email }
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            { item.phone }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
            </Grid>
        )
    }

}