import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  required,
  SelectArrayInput,
} from 'react-admin';
import axios from 'axios';

let collectionChoices: object[] | undefined = [];

axios({
  method: 'get',
  url: 'https://nelp.com:8000/v1/collections',
}).then(({ data }) => (collectionChoices = data));

export const CollectionList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
    </Datagrid>
  </List>
);

export const CollectionEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" fullWidth validate={required()} />
        <TextInput source="slug" fullWidth validate={required()} />
        <SelectArrayInput
          fullWidth
          label="Subcollections"
          source="subcollections"
          choices={collectionChoices}
        />
      </SimpleForm>
    </Edit>
  );
};

export const CollectionCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" fullWidth validate={required()} />
      <SelectArrayInput
        fullWidth
        label="Subcollections"
        source="subcollections"
        choices={collectionChoices}
      />
    </SimpleForm>
  </Create>
);
