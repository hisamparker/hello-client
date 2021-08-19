import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../lib/api';

const useUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
};

export default useUser;
