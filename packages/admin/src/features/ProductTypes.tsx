// import * as UI from '@material-ui/core';
// import { useState } from 'react';
// import {
//   List,
//   Datagrid,
//   TextField,
//   Edit,
//   SimpleForm,
//   TextInput,
//   Create,
//   required,
//   SelectInput,
//   useCreate,
//   useCreateSuggestionContext,
//   ReferenceInput,
//   useNotify,
// } from 'react-admin';

// const { Button, Dialog, DialogActions, DialogContent } = UI;

// export const ProductTypesList = (props: any) => (
//   <List {...props}>
//     <Datagrid rowClick="edit">
//       <TextField source="name" />
//     </Datagrid>
//   </List>
// );

// export const ProductTypesEdit = (props: any) => {
//   return (
//     <Edit {...props}>
//       <SimpleForm>
//         <TextInput source="name" fullWidth validate={required()} />
//         <TextInput source="slug" fullWidth validate={required()} />
//         <ReferenceInput source="collectionId" reference="collections">
//           <SelectInput resettable={true} create={<CreateCollection />} />
//         </ReferenceInput>
//       </SimpleForm>
//     </Edit>
//   );
// };

// export const ProductTypesCreate = (props: any) => (
//   <Create {...props}>
//     <SimpleForm>
//       <TextInput source="name" fullWidth validate={required()} />
//       <ReferenceInput source="collectionId" reference="collections">
//         <SelectInput resettable={true} create={<CreateCollection />} />
//       </ReferenceInput>
//     </SimpleForm>
//   </Create>
// );

// const CreateCollection = () => {
//   const { filter, onCancel, onCreate } = useCreateSuggestionContext();
//   const [value, setValue] = useState(filter || '');
//   const [create] = useCreate('collections');
//   const notify = useNotify();

//   const handleSubmit = (event: any) => {
//     event.preventDefault();
//     create(
//       {
//         payload: {
//           data: {
//             name: value,
//           },
//         },
//       },
//       {
//         onSuccess: ({ data }: any) => {
//           setValue('');
//           onCreate(data);
//           notify(`New Collection created`);
//         },
//       },
//     );
//   };

//   return (
//     <Dialog open onClose={onCancel}>
//       <form onSubmit={handleSubmit}>
//         <DialogContent>
//           <UI.TextField
//             label="New Collection name"
//             onChange={(event: any) => setValue(event.target.value)}
//             value={value}
//             autoFocus
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button type="submit">Save</Button>
//           <Button onClick={onCancel}>Cancel</Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };
export {};
