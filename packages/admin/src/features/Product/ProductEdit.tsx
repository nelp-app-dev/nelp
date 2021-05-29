import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import SaveIcon from '@material-ui/icons/Save';
import { IoTrashBin } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImageUpload } from '../Common/Image/ImageUpload';
import { Document } from '../Common/Layout/Document/Document';
import { useProduct } from './product.api';
import { useNav } from '../Common/Layout/layout.store';

const useStyles = makeStyles((theme) => ({
  form: {
    flexGrow: 1,
    // '&& .MuiGrid-item': {
    //   margin: theme.spacing(1),
    // },
    '&& .MuiFormControl-root': {
      marginBottom: theme.spacing(1.5),
    },
  },
  container: {
    padding: theme.spacing(3.5),
    position: 'relative',
  },
  paper: {
    padding: theme.spacing(3),
    overflow: 'auto',
  },
  formBottom: {
    margin: '-24px',
    marginTop: '16px',
    padding: '16px 24px',
    backgroundColor: '#eee',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export const ProductEdit = () => {
  const classes = useStyles();
  const { id }: any = useParams();
  const { data = {} as any, isLoading } = useProduct(id);
  const [product, setProduct] = useState(data);
  const { setTitle } = useNav();

  useEffect(() => {
    !!data.name && setTitle('Product: ' + data.name);
    setProduct(data);
  }, [data]);

  return (
    <Document loading={isLoading}>
      <form noValidate autoComplete="off" className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <FormControl fullWidth>
              <TextField
                label="Name"
                variant="filled"
                value={product.name || ''}
                onChange={(event) =>
                  setProduct({ ...product, name: event.target.value })
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <NumberFormat
                label="Price"
                variant="filled"
                customInput={TextField}
                value={product.price || ''}
                onChange={(event) =>
                  setProduct({ ...product, price: +event.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Card style={{ padding: '15px' }}>
              <ImageUpload
                image={product.image}
                onChange={(image: any) => {
                  setProduct({ ...product, image });
                }}
              />
            </Card>
          </Grid>
        </Grid>

        <Box className={classes.formBottom}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            href="#text-buttons"
            color="secondary"
            startIcon={<IoTrashBin />}
          >
            Delete
          </Button>
        </Box>
      </form>
    </Document>
  );
};
