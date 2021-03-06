import React from "react";
import PostCreate from "./Components/PostCreate.js";
import PostList from "./Components/PostList.js";

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />

      <PostList />
    </div>
  );
};

export default App;
