import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: theme.spacing(3),
  },
}));

function Alert(props: AlertProps) {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      style={{ marginTop: '10px' }}
      {...props}
    />
  );
}

interface IAuth {
  email: string;
  password: string;
}

export const Login = () => {
  const classes = useStyles();
  const [auth, setAuth] = useState({} as IAuth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data: any) => {
    console.log(data, errors);
  });

  console.log(watch('email')); // watch input value by passing the name of it

  return (
    <Container className={classes.container} maxWidth="xs">
      <form onSubmit={onSubmit}>
        <h1 style={{ fontWeight: 200 }}>Admin Page</h1>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  size="medium"
                  variant="outlined"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <div
                    style={{
                      textAlign: 'left',
                      fontSize: '12px',
                      padding: '5px 0',
                      color: '#f44336',
                    }}
                  >
                    Email is required
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  size="medium"
                  type="password"
                  variant="outlined"
                  {...register('password', { required: true, minLength: 8 })}
                />
                {errors.password && (
                  <div
                    style={{
                      textAlign: 'left',
                      fontSize: '12px',
                      padding: '5px 0',
                      color: '#f44336',
                    }}
                  >
                    Password is required and must have a minimum of 8 characters
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              color="secondary"
              fullWidth
              type="submit"
              variant="contained"
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
