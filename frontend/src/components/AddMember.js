import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from 'react-router-dom';

export default class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            role: true,
        };
        this.handleAddMemberButton = this.handleAddMemberButton.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: e.target.value,
        });
    }

    handleLastNameChange(e) {
        this.setState({
            lastName: e.target.value,
        });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value,
        });
    }

    handlePhoneChange(e) {
        this.setState({
            phone: e.target.value,
        });
    }

    handleRoleChange(e) {
        this.setState({
            role: e.target.value === "true" ? true : false,
        });
    }

    handleAddMemberButton() {
        const requestOpts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // xsrfHeaderName: "X-CSRFToken",
            body: JSON.stringify({
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
                role: this.state.role
            })
        };
        fetch('backend/add/', requestOpts).then((response) => response.json()).then((data) => console.log(data));
        setTimeout(() => {
            this.props.history.push("/list")
          }, 2000);
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Add a Team Member
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Role
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="false" onChange={this.handleRoleChange}>
                            <FormControlLabel 
                                value="true" 
                                control={<Radio color="primary"/>} 
                                label="Admin"
                            />
                            <FormControlLabel 
                                value="false" 
                                control={<Radio color="primary"/>} 
                                label="Regular"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <FormHelperText>
                            <div align="center">
                                First Name
                            </div>
                        </FormHelperText>
                        <TextField onChange={this.handleFirstNameChange} inputProps={{
                            style: {textAlign: "center"}
                        }}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <FormHelperText>
                            <div align="center">
                                Last Name
                            </div>
                        </FormHelperText>
                        <TextField onChange={this.handleLastNameChange} inputProps={{
                            style: {textAlign: "center"}
                        }}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <FormHelperText>
                            <div align="center">
                                Email
                            </div>
                        </FormHelperText>
                        <TextField onChange={this.handleEmailChange} inputProps={{
                            style: {textAlign: "center"}
                        }}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <FormHelperText>
                            <div align="center">
                                Phone
                            </div>
                        </FormHelperText>
                        <TextField onChange={this.handlePhoneChange} inputProps={{
                            style: {textAlign: "center"}
                        }}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleAddMemberButton}>
                    Add Team Member
                </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" to="/list" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}