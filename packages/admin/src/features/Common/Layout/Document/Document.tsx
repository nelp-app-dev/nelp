import { Box, Button, Container, makeStyles, Paper } from '@material-ui/core';
import { Loading } from '../../Loading/Loading';
import { IoChevronBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3.5),
    position: 'relative',
  },
  paper: {
    padding: theme.spacing(3),
    overflow: 'auto',
    position: 'relative',
  },
}));

export const Document = ({ loading, children }: any) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.container} maxWidth={false}>
      <Box display="flex" justifyContent="flex-start" marginBottom="5px">
        <Button
          href=""
          onClick={(ev: any) => {
            ev.preventDefault();
            history.goBack();
          }}
          color="primary"
          startIcon={<IoChevronBack />}
        >
          Back
        </Button>
        {/* <Button
          href=""
          onClick={(ev) => {
            ev.preventDefault();
            history.push(`/${resource}`);
          }}
          color="primary"
          startIcon={<RiRefreshLine />}
        >
          Refresh
        </Button> */}
      </Box>
      <Paper elevation={4} className={classes.paper}>
        <Loading loading={loading} />
        {children}
      </Paper>
    </Container>
  );
};
