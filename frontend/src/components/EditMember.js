import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from '@material-ui/core/Button';

export default class EditMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            role: "",
            DataisLoaded: false
        };
        this.handleUpdateMemberButton = this.handleUpdateMemberButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }
    
    componentDidMount() {
        fetch("/backend/list/" + this.props.match.params.id)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    id: json[0].id,
                    firstname: json[0].firstname,
                    lastname: json[0].lastname,
                    email: json[0].email,
                    phone: json[0].phone,
                    role: json[0].role,
                    DataisLoaded: true
                });
            })
    }

    handleFirstNameChange(e) {
        this.setState({
            firstname: e.target.value,
        });
        console.log(this.state.firstname);
    }

    handleLastNameChange(e) {
        this.setState({
            lastname: e.target.value,
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

    handleUpdateMemberButton() {
        const requestOpts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                phone: this.state.phone,
                role: this.state.role
            })
        };
        // console.log(requestOpts);
        fetch('/backend/add/', requestOpts).then((response) => response.json()).then((data) => console.log(data));
        setTimeout(() => {
            this.props.history.push("/list")
          }, 2000);
    }

    handleDeleteButton() {
        const requestOpts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id
            })
        };
        // console.log(requestOpts);
        fetch('/backend/delete/', requestOpts).then((response) => response.json()).then((data) => console.log(data));
        setTimeout(() => {
            this.props.history.push("/list")
          }, 2000);
    }

    render() {
        const { DataisLoaded, firstname, lastname, email, phone, role } = this.state;
        console.log(role);
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div>;

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Edit Team Member
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Role
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={ role==true ? 'true' : 'false' } onChange={this.handleRoleChange}>
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
                        <TextField defaultValue={firstname} onChange={this.handleFirstNameChange} inputProps={{
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
                        <TextField defaultValue={lastname} onChange={this.handleLastNameChange} inputProps={{
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
                        <TextField defaultValue={email} onChange={this.handleEmailChange} inputProps={{
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
                        <TextField defaultValue={phone} onChange={this.handlePhoneChange} inputProps={{
                            style: {textAlign: "center"}
                        }}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleUpdateMemberButton}>
                    Save
                </Button>
                </Grid>
                { role == true ? (
                    <Grid item xs={12} align="center">
                        <Button color="primary" variant="contained" onClick={this.handleDeleteButton}>
                            Delete
                        </Button>
                    </Grid>) : <div></div>
                }
            </Grid>
        )
    }
}