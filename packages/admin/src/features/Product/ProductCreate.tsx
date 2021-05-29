import {
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  FormControl,
  Grid,
  Box,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
} from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import { ImageUpload } from '../Common/Image/ImageUpload';
import { Document } from '../Common/Layout/Document/Document';
import { useCreateProduct } from './product.api';

const SelectCollectionType = ({ product, setProduct }: any) => {
  const [collections, setCollections] = useState([] as any);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://nelp.com:8000/v1/collections',
    }).then(({ data }) => setCollections(data));
  }, []);

  return (
    <FormControl required variant="filled" style={{ width: '100%' }}>
      <InputLabel
        htmlFor="grouped-select"
        style={{
          fontFamily: "'Titillium Web', sans-serif",
        }}
      >
        Collection Type
      </InputLabel>
      <Select
        value={(product.collectionType || '').id}
        onChange={(ev: any) => {
          let _collectionType;
          for (let collection of collections) {
            _collectionType = collection.types.find(
              (t: any) => t.id === ev.target.value,
            );
            if (_collectionType) break;
          }
          setProduct({ ...product, collectionType: _collectionType });
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {collections.reduce((acc: any, c: any) => {
          acc = [
            ...acc,
            <ListSubheader key={c.id}>{c.name}</ListSubheader>,
            c.types.map((t: any) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            )),
          ];

          return acc;
        }, [])}
      </Select>
      {/* <CreateType
        onCreate={(type: any) => {
          setCollections([type.collection, ...collections]);
          setType(type);
          form.change('collectionType', type);
          setFilled({
            ...filled,
            0: {
              ...filled[0],
              type: !!type,
            },
          });
        }}
      /> */}
    </FormControl>
  );
};

const useStyles = makeStyles((theme) => ({
  formBottom: {
    margin: '-24px',
    marginTop: '16px',
    padding: '16px 24px',
    backgroundColor: '#eee',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const steps = ['General Information', 'Choose an Image', 'Submit'];

export const ProductCreate = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [product, setProduct] = useState({} as any);
  const { mutate: createProduct } = useCreateProduct();
  const history = useHistory();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    createProduct(product, {
      onSuccess: (data) => history.push('/products/' + data.id),
    });
  };

  return (
    <Document>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center', margin: '60px 0' }}>New Product</h1>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          <div
            style={{
              justifyContent: 'center',
              maxWidth: '700px',
              width: '100%',
              margin: '0 auto',
            }}
          >
            <div style={{ margin: '60px auto' }}>
              {activeStep === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <SelectCollectionType
                      product={product}
                      setProduct={setProduct}
                    />
                  </Grid>

                  {/* <TextInput
                    source="name"
                    fullWidth
                    validate={required()}
                    onChange={(ev: any) => {
                      setPreview({
                        ...preview,
                        name: ev.target.value,
                      });
                      setFilled({
                        ...filled,
                        0: {
                          ...filled[0],
                          name: ev.target.value.length !== 0,
                        },
                      });
                    }}
                  />
                  <NumberInput
                    source="price"
                    fullWidth
                    validate={required()}
                    onChange={(ev: any) => {
                      setPreview({
                        ...preview,
                        price: '$' + (+ev.target.value).toFixed(2),
                      });
                      setFilled({
                        ...filled,
                        0: {
                          ...filled[0],
                          price: ev.target.value.length !== 0,
                        },
                      });
                    }}
                  />
                  <SetCollectionType
                    type={type}
                    filled={filled}
                    collections={collections}
                    setCollections={setCollections}
                    form={form}
                    setFilled={setFilled}
                    setType={setType}
                  /> */}
                </Grid>
              )}
              {activeStep === 1 && (
                <div style={{ width: '320px', margin: '0 auto' }}>
                  <ImageUpload
                    image={product.image}
                    onChange={(image: any) => {
                      setProduct({ ...product, image });
                    }}
                  />
                </div>
              )}
              {activeStep === 2 && (
                <div
                  style={{
                    width: '350px',
                    margin: '0 auto',
                  }}
                >
                  <div
                    style={{
                      background: '#fafafa',
                      transition: 'all 0.3s ease',
                      boxShadow:
                        '0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)',
                      fontSize: '18px',
                      fontWeight: 200,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        padding: '15px',
                        fontWeight: 200,
                      }}
                    >
                      <img
                        src={product.image}
                        alt="Preview"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'top',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      <div style={{ paddingTop: '15px' }}>{product.name}</div>
                      <div>{product.price}</div>
                      <button
                        type="button"
                        style={{
                          transition: 'all 0.2s ease',
                          borderWidth: '1px',
                          borderColor: '#2196f3',
                          color: '#2196f3',
                          padding: '10px',
                          fontWeight: 200,
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '30px',
                          marginTop: '15px',
                          width: '100%',
                          backgroundColor: '#fff',
                          fontSize: '18px',
                        }}
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <br />
        <Box className={classes.formBottom}>
          <Box>
            <Button
              disabled={activeStep === 0}
              href=""
              color="primary"
              size="large"
              onClick={handleBack}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 && (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                disabled={
                  (activeStep === 0 &&
                    (!product.name ||
                      !product.price ||
                      !product.collectionType)) ||
                  (activeStep === 1 && !product.image)
                }
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button
                color="primary"
                variant="contained"
                size="large"
                type="submit"
              >
                Save
              </Button>
            )}
          </Box>
        </Box>
        {/* 
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <Button
          // disabled={activeStep === 0}
          color="secondary"
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 && (
          <Button color="primary" variant="filled">
            Save
          </Button>
        )}
        {activeStep < steps.length - 1 && (
          <Button
            // disabled={activeStep === 0}
            color="primary"
            variant="filled"
            onClick={handleNext}
          >
            Next
          </Button>
        )} */}
        {/* </div> */}
      </form>
    </Document>
  );
};
