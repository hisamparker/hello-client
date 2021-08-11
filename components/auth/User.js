import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../lib/api';

const useUser = () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error}</p>;
  return data?.authenticatedItem;
};

export default useUser;
