import './App.css'
import PostList from './components/PostList';
import { generateMockPosts } from './utils/mockData';

const App = () => {

  const samplePosts = generateMockPosts(30)

  return (
    <div className="app">
      <PostList posts={samplePosts} />
    </div>
  );
};

export default App;
