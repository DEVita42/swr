import useSWR, { mutate } from 'swr';

function UseGithubUser(username) {
  const { data, error } = useSWR(username ? `https://api.github.com/users/${username}` : null);

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
