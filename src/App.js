import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
function App() {
  const client = new ApolloClient({
    link: createUploadLink({
      uri: "http://192.168.29.72:8888/graphql",
    }),
    cache: new InMemoryCache()
  });
  const classes = useStyles();


  const Uploadfile = gql`
mutation Post($file:Upload!)
{
  createImageFile(file:$file){
    imageFile{
      id
    }
  }
}`;
  const UploadFile = () => {
    const [mutate, { loading, error }] = useMutation(Uploadfile);
    const onChange = ({
      target: {
        validity,
        files: [file]
      }
    }) => {
      validity.valid && mutate({ variables: { file: file } });
      console.log(file);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

    return (
      <React.Fragment>
        <input type="file" required onChange={onChange} name="file" />
      </React.Fragment>
    );
  };

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div>
          <h2>My first Apollo app 🚀</h2>
          <UploadFile />
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;