import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';

const fetchJson = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  // add your own headers here
  // options.headers.set('X-Custom-Header', 'foobar');
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider('https://nelp.com:8000/v1', fetchJson);

const createOrUpdate = (type: string, resource: any, params: any) => {
  if (
    resource !== 'products' ||
    !params.data.image ||
    typeof params.data.image === 'string'
  ) {
    // fallback to the default implementation
    return dataProvider[type](resource, params);
  }
  /**
   * For posts update only, convert uploaded image in base 64 and attach it to
   * the `picture` sent property, with `src` and `title` attributes.
   */

  // Freshly dropped pictures are File objects and must be converted to base64 strings
  const newPictures = [params.data.image].filter(
    (p: any) => p.rawFile instanceof File,
  );

  return Promise.all(newPictures.map(convertFileToBase64))
    .then((base64Pictures) => base64Pictures.map((picture64) => picture64))
    .then((transformedNewPictures) =>
      dataProvider[type](resource, {
        ...params,
        data: {
          ...params.data,
          image: transformedNewPictures[0],
        },
      }),
    );
};

const myDataProvider = {
  ...dataProvider,
  update: (resource: any, params: any) =>
    createOrUpdate('update', resource, params),
  create: (resource: any, params: any) =>
    createOrUpdate('create', resource, params),
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });

export default myDataProvider;
