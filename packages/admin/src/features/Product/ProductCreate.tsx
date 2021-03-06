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
} from '@material-ui/core';
import { useState } from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import { ImageUpload } from '../Common/Image/ImageUpload';
import { Document } from '../Common/Layout/Document/Document';
import { Layout } from '../Common/Layout/Layout';
import { useCreateProduct } from './product.api';

// const SelectCollectionType = ({ product, setProduct }: any) => {
//   const [collections, setCollections] = useState([] as any);

//   useEffect(() => {
//     axios({
//       method: 'get',
//       url: 'https://nelp.com:8000/v1/collections',
//     }).then(({ data }) => setCollections(data));
//   }, []);

//   return (
//     <FormControl required variant="filled" style={{ width: '100%' }}>
//       <InputLabel
//         htmlFor="grouped-select"
//         style={{
//           fontFamily: "'Titillium Web', sans-serif",
//         }}
//       >
//         Collection Type
//       </InputLabel>
//       <Select
//         value={(product.collectionType || '').id}
//         onChange={(ev: any) => {
//           let _collectionType;
//           for (let collection of collections) {
//             _collectionType = collection.types.find(
//               (t: any) => t.id === ev.target.value,
//             );
//             if (_collectionType) break;
//           }
//           setProduct({ ...product, collectionType: _collectionType });
//         }}
//       >
//         <MenuItem value="">
//           <em>None</em>
//         </MenuItem>
//         {collections.reduce((acc: any, c: any) => {
//           acc = [
//             ...acc,
//             <ListSubheader key={c.id}>{c.name}</ListSubheader>,
//             c.types.map((t: any) => (
//               <MenuItem key={t.id} value={t.id}>
//                 {t.name}
//               </MenuItem>
//             )),
//           ];

//           return acc;
//         }, [])}
//       </Select>
//       {/* <CreateType
//         onCreate={(type: any) => {
//           setCollections([type.collection, ...collections]);
//           setType(type);
//           form.change('collectionType', type);
//           setFilled({
//             ...filled,
//             0: {
//               ...filled[0],
//               type: !!type,
//             },
//           });
//         }}
//       /> */}
//     </FormControl>
//   );
// };

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
  const [product, setProduct] = useState({
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAINCAYAAADcLKyTAAAgAElEQVR4Xu3dfdClZX3Y8d/yDoLQOCCZGAFl0UatMRg1hmlqWzVqktF0po1pGzNNE9+SpvWN5XXZXUBW8TUWo1bFiG+4giS1NTKN0ZkqicEGUBOdSQaL0VATDSgKCGzn5nkYWXfPPuc693Wfc9/X77Mzjn9wruvc1+d3PeuXx7PPbtr9C8/eHX4RIECAAAECBAgQaFRgk+BtdLKORYAAAQIECBAgcK+A4HURCBAgQIAAAQIEmhYQvE2P1+EIECBAgAABAgQErztAgAABAgQIECDQtIDgbXq8DkeAAAECBAgQICB43QECBAgQIECAAIGmBQRv0+N1OAIECBAgQIAAAcHrDhAgQIAAAQIECDQtIHibHq/DESBAgAABAgQICF53gAABAgQIECBAoGkBwdv0eB2OAAECBAgQIEBA8LoDBAgQIECAAAECTQsI3qbH63AECBAgQIAAAQKC1x0gQIAAAQIECBBoWkDwNj1ehyNAgAABAgQIEBC87gABAgQIECBAgEDTAoK36fE6HAECBAgQIECAgOB1BwgQIECAAAECBJoWELxNj9fhCBAgQIAAAQIEBK87QIAAAQIECBAg0LSA4G16vA5HgAABAgQIECAgeN0BAgQIECBAgACBpgUEb9PjdTgCBAgQIECAAAHB6w4QIECAAAECBAg0LSB4mx6vwxEgQIAAAQIECAhed4AAAQIECBAgQKBpAcHb9HgdjgABAgQIECBAQPC6AwQIECBAgAABAk0LCN6mx+twBAgQIECAAAECgtcdIECAAAECBAgQaFpA8DY9XocjQIAAAQIECBAQvO4AAQIECBAgQIBA0wKCt+nxOhwBAgQIECBAgIDgdQcIECBAgAABAgSaFhC8TY/X4QgQIECAAAECBASvO0CAAAECBAgQINC0gOBterwOR4AAAQIECBAgIHjdAQIECBAgQIAAgaYFBG/T43U4AgQIECBAgAABwesOECBAgAABAgQINC0geJser8MRIECAAAECBAgIXneAAAECBAgQIECgaQHB2/R4HY4AAQIECBAgQEDwugMECBAgQIAAAQJNCwjepsfrcAQIECBAgAABAoLXHSBAgAABAgQIEGhaQPA2PV6HI0CAAAECBAgQELzuAAECBAgQIECAQNMCgrfp8TocAQIECBAgQICA4HUHCBAgQIAAAQIEmhYQvE2P1+EIECBAgAABAgQErztAgAABAgQIECDQtIDgbXq8DkeAAAECBAgQICB43QECBAgQIECAAIGmBQRv0+N1OAIECBAgQIAAAcHrDhAgQIAAAQIECDQtIHibHq/DESBAgAABAgQICF53gAABAgQIECBAoGkBwdv0eB2OAAECBAgQIEBA8LoDBAgQIECAAAECTQsI3qbH63AECBAgQIAAAQKC1x0gQIAAAQIECBBoWkDwNj1ehyNAgAABAgQIEBC87gABAgQIECBAgEDTAoK36fE6HAECBAgQIECAgOB1BwgQIECAAAECBJoWELxNj9fhCBAgQIAAAQIEBK87QIAAAQIECBAg0LSA4G16vA5HgAABAgQIECAgeN0BAgQIECBAgACBpgUEb9PjdTgCBAgQIECAAAHB6w4QIECAAAECBAg0LSB4mx6vwxEgQIAAAQIECAhed4AAAQIECBAgQKBpAcHb9HgdjgABAgQIECBAQPC6AwQIECBAgAABAk0LCN6mx+twBAgQIECAAAECgtcdIECAAAECBAgQaFpA8DY9XocjQIAAAQIECBAQvO4AAQIECBAgQIBA0wKCt+nxOhwBAgQIECBAgIDgdQcIECBAgAABAgSaFhC8TY/X4QgQIECAAAECBASvO0CAAAECBAgQINC0gOBterwOR4AAAQIECBAgIHjdAQIECBAgQIAAgaYFBG/T43U4AgQIECBAgAABwesOECBAgAABAgQINC0geJser8MRIECAAAECBAgIXneAAAECBAgQIECgaQHB2/R4HY4AAQIECBAgQEDwugMECBAgQIAAAQJNCwjepsfrcAQIECBAgAABAoLXHSBAgAABAgQIEGhaQPA2PV6HI0AgpcA/fmTEaT8dcfc9EbffHnHnneNgOOCAiEMOibjhhojPfT7i7rvH8VyeggCB5gUEb/MjdkACBFIJHHFExKt3RjzkIeM99u7dEW95a8T//Oh4n9GTESDQlIDgbWqcDkOAAIGIOOaYiLPOjDhl83g53vu+iA9cPt7n82QECDQlIHibGqfDECBAYF3g6KMjtp8XceKJ4yTpYreLXr8IECCwBAHBuwRkb0GAAIGVCDzwgRE7to0zegXvSq6ENyWQVUDwZp28cxMgkEOg+07vOWdHbD55XOcVvOOah6ch0LiA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',
  } as any);
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
      onSuccess: (data: any) => history.push('/products/' + data.data.id),
    });
  };

  return (
    <Layout>
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
                            setProduct({
                              ...product,
                              price: +event.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={12}>
                    <SelectCollectionType
                      product={product}
                      setProduct={setProduct}
                    />
                  </Grid> */}

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
                        <div>${product.price.toFixed(2)}</div>
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
                    (activeStep === 0 && (!product.name || !product.price)) ||
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
    </Layout>
  );
};
