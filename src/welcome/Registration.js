import React from "react";
import { Link } from 'react-router-dom';
import useStatefulFields from "../hooks/useStatefulFields";
import useAuthSubmit from "../hooks/useAuthSubmit";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function Registration() {
    const classes = useStyles();

    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/registration", values);

    return (
        <>
            <h1>Register</h1>
            { error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>

                <TextField
                    name="first"
                    onChange={handleChange}

                    label="*required"
                    style={{ margin: 8 }}
                    placeholder="First name"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    name="last"
                    onChange={handleChange}

                    label="*required"
                    style={{ margin: 8 }}
                    placeholder="Last name"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    name="email"
                    onChange={handleChange}

                    label="*required"
                    style={{ margin: 8 }}
                    placeholder="Email"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    name="password"
                    onChange={handleChange}
                    type="password"
                    label="*required"
                    style={{ margin: 8 }}
                    placeholder="Password"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    name="password2"
                    onChange={handleChange}
                    type="password"
                    label="*required"
                    style={{ margin: 8 }}
                    placeholder="Password validation"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<VpnKeyIcon />}
                >
                    Register
                </Button>

            </form>
            <p>Already registered? <Link to="/login">Click here</Link> to log in.</p>
        </>
    );
}

// <button type="submit">register</button>
// <input onChange={handleChange} type="text" name="first" placeholder="first name"/>
//
// <input onChange={handleChange} type="text" name="last" placeholder="last name"/>
//
// <input onChange={handleChange} type="text" name="email" placeholder="email"/>
//
// <input onChange={handleChange} type="password" name="password" placeholder="password"/>
//
// <input onChange={handleChange} type="password" name="password2" placeholder="repeat password"/>
