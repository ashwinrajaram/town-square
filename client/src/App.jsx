
import './App.css'
import PostList from './components/PostList';
import { generateMockPosts } from './utils/mockData';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


const samplePosts = generateMockPosts(30)

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});



const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <PostList posts={samplePosts} />
      </div>
    </ApolloProvider>

  );
};

export default App;
