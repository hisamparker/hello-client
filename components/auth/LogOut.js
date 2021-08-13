import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY, LOG_OUT_MUTATION } from '../../lib/api';

const LogOut = () => {
  const router = useRouter();
  const update = (cache) => {
    cache.gc();
  };
  const [logOut] = useMutation(LOG_OUT_MUTATION, {
    // we refetch so that we rerender
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    update,
  });

  const handleLogOut = () => {
    logOut();
    // this is not in the tutorial but without it the cache won't clear and the nav bar won't reset to show logged out view until refresh
    // https://stackoverflow.com/questions/48887480/reset-store-after-logout-with-apollo-client
    router.push('/');
  };

  return (
    <button onClick={handleLogOut} type="button">
      Log Out
    </button>
  );
};

export default LogOut;
