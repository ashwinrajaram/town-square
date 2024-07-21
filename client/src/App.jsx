
import './App.css'
import PostList from './components/PostList';
import client from './apollo/client'
import { ApolloProvider } from '@apollo/client'


const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <PostList />
      </div>
    </ApolloProvider>

  );
};

export default App;
