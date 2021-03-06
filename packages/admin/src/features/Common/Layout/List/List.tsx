import { DataGrid as UIDataGrid, GridColDef } from '@material-ui/data-grid';
import { Box, Button, makeStyles, Paper } from '@material-ui/core';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../Loading/Loading';
import { AiFillFile } from 'react-icons/ai';

export const EditButton = ({ to }: { to: string }) => {
  const history = useHistory();

  return (
    <Button
      href=""
      onClick={(ev: any) => {
        ev.preventDefault();
        history.push(to);
      }}
      color="primary"
      startIcon={<MdEdit />}
    >
      Edit
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    margin: theme.spacing(3),
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    '& .MuiDataGrid-columnHeaderWrapper .MuiIconButton-label': {
      color: theme.palette.primary.light,
    },
  },
  dataGrid: {
    border: 0,
    height: '100%',
    minHeight: '540px',
  },
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
    position: 'relative',
  },
}));

interface Props {
  loading: boolean;
  resource: string;
  rows: any;
  columns: GridColDef[];
}

export const List = ({ loading, resource, rows, columns }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  let content = null;

  if (rows.length === 0 && loading === false) {
    content = (
      <div
        style={{
          textAlign: 'center',
          height: 'calc(100% - 64px)',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div>
          <AiFillFile size="150px" color="#ccc" />
          <h2 style={{ fontSize: '20px', color: '#999' }}>
            Oups...the list is empty
          </h2>
          <p style={{ color: '#999', fontSize: '16px', marginBottom: '25px' }}>
            Be the first to create a new one
          </p>
          <Button
            size="large"
            color="primary"
            type="button"
            variant="contained"
            onClick={() => history.push(`/${resource}/create`)}
          >
            Create
          </Button>
        </div>
      </div>
    );
  } else {
    content = (
      <UIDataGrid
        className={classes.dataGrid}
        rows={rows}
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    );
  }

  return (
    <div className={classes.root}>
      <Loading loading={loading} />
      <Box display="flex" justifyContent="flex-end" marginBottom="5px">
        <Button
          href=""
          onClick={(ev) => {
            ev.preventDefault();
            history.push(`/${resource}/create`);
          }}
          color="primary"
          startIcon={<AiOutlinePlus />}
        >
          Create
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
        {content}
      </Paper>
    </div>
  );
};
