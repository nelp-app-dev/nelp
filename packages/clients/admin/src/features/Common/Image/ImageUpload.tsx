import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    input: {
      display: 'none',
    },
  }),
);

export const ImageUpload = ({ onChange, image }: any) => {
  const classes = useStyles();

  const handleImageChange = (e: any) => {
    e.preventDefault();

    if (e) {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        // setImage(reader);
        onChange(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.root}>
      <img src={image} alt="upload" />
      <input
        accept="image/*"
        className={classes.input}
        onChange={handleImageChange}
        id="outlined-button-file"
        multiple
        type="file"
      />
      <label htmlFor="outlined-button-file">
        <Button
          variant="outlined"
          color="primary"
          component="span"
          style={{ marginTop: '25px' }}
        >
          Upload Image
        </Button>
      </label>
    </div>
  );
};

// import { useState } from 'react';

// export const ImageUpload = () => {
//   const [image, setImage] = useState({
//     file: '',
//     image: '',
//   } as any);

//   const handleImageChange = (e: any) => {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];

//     reader.onloadend = () => {
//       setImage({
//         file: file,
//         image: reader.result,
//       });
//     };

//     reader.readAsDataURL(file);
//   };

//   let { image } = image;
//   let $imagePreview = null;
//   if (image) {
//     $imagePreview = <img src={image} alt="upload" />;
//   }

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />

//       {$imagePreview}
//     </div>
//   );
// };
