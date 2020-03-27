import React from "react";
import { Link } from 'react-router-dom';
import useStatefulFields from "../hooks/useStatefulFields";
import useAuthSubmit from "../hooks/useAuthSubmit";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

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

export default function Login() {
    const classes = useStyles();

    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/login", values);

    return (
        <>
            <h1>Log in</h1>
            { error && <p>{error}</p>}
            <form>
                <form onSubmit={handleSubmit}>
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<VpnKeyIcon />}
                    >
                        Login
                    </Button>
                </form>
                <p>Forgot your password? <Link to="/reset">Click here</Link> to reset it.</p>
                <p>Not a member yet? <Link to="/">Click here</Link> to register.</p>
            </form>
        </>
    );
}

// <button type="submit">log in</button>
// <input name="email" type="text" placeholder="email" onChange={handleChange}/>
// <input name="password" type="password" placeholder="password" onChange={handleChange}/>
/*
rules of hooks

1. can only be used in function components
2. they must start with the word "use"
3. they must be called at the top level of the component (ie can't be called in loops)
*/
