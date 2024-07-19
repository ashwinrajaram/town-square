import './App.css'
import PostList from './components/PostList';

const App = () => {
  const samplePosts = [
    { id: 1, title: "First Post", description: "This is the first post." },
    { id: 2, title: "Second Post", description: "This is the second post." },
    { id: 3, title: "Third Post", description: "This is the third post." },
  ];

  return (
    <div className="app">
      <PostList posts={samplePosts} />
    </div>
  );
};

export default App;
