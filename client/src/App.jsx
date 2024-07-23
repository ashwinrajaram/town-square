
import './App.css'
import client from './apollo/client'
import { ApolloProvider } from '@apollo/client'
import PostContainer from './components/PostContainer';


const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <PostContainer />
      </div>
    </ApolloProvider>

  );
};

export default App;
