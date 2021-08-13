import { useMutation, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY, LOG_OUT_MUTATION } from '../../lib/api';

const LogOut = ({ setIsUser }) => {
  const router = useRouter();
  const client = useApolloClient();

  const [logOut] = useMutation(LOG_OUT_MUTATION, {
    // we refetch so that we rerender
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleLogOut = () => {
    logOut();
    // this is not in the tutorial but without it the cache won't clear and the nav bar won't reset to show logged out view until refresh
    // https://stackoverflow.com/questions/48887480/reset-store-after-logout-with-apollo-client
    client.resetStore();
    client.clearStore();
    client.cache.reset();
    setIsUser(false);
    router.push('/');
  };

  return (
    <button onClick={handleLogOut} type="button">
      Log Out
    </button>
  );
};

export default LogOut;

LogOut.propTypes = {
  setIsUser: PropTypes.func,
};
