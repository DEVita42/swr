import useSWR, { mutate } from 'swr';

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
});

function UseGithubUser(username) {
  const { data, error } = useSWR(username ? `https://api.github.com/users/${username}` : null, fetcher);

  const refetch = () => {
    if (username) {
      mutate(`https://api.github.com/users/${username}`);
    }
  };

  return {
    data,
    error: error ? error.message : null,
    loading: !data && !error, 
    refetch, 
  };
}

export default UseGithubUser;
