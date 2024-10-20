import React from 'react';
import { SWRConfig } from 'swr';
import UseGithubUser from './UseGithubUser';

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
});

function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <div>
        <h1>Github User Info</h1>
        <UserComponent username="octocat" />
      </div>
    </SWRConfig>
  );
}

const UserComponent = ({ username }) => {
  const { data, error, loading, refetch } = UseGithubUser(username);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data) return (
    <div>
      User: {data.name}
      <button onClick={refetch}>Refetch User Data</button>
    </div>
  );

  return null;
};

export default App;
