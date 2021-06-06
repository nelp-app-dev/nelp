import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useAuth } from './auth.api';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: theme.spacing(3),
  },
}));

export const Login = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  const onSubmit = handleSubmit(async (data: any) => {
    setLoading(true);
    await login(data);
    history.push('/products');
  });

  return (
    <Container className={classes.container} maxWidth="xs">
      <form onSubmit={onSubmit}>
        <h1 style={{ fontWeight: 200 }}>Admin Section</h1>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  size="medium"
                  variant="outlined"
                  {...register('email', {
                    required: true,
                    pattern: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
                  })}
                />
                {errors.email && (
                  <div
                    style={{
                      marginLeft: '15px',
                      textAlign: 'left',
                      fontSize: '12px',
                      padding: '5px 0',
                      color: '#f44336',
                    }}
                  >
                    {errors.email.type === 'required' && 'Email is required'}
                    {errors.email.type === 'pattern' && 'Email is invalid'}
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
                      marginLeft: '15px',
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
              disabled={loading}
            >
              {loading ? 'Loading' : 'Log in'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
