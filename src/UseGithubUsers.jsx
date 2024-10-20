import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
});

function UseGithubUser(username) {
  const { data, error } = useSWR(username ? `https://api.github.com/users/${username}` : null, fetcher);

  return {
    data,
    error: error ? error.message : null,
    loading: !data && !error, 
  };
}

export default UseGithubUser;
