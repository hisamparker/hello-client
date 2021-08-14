import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY, LOG_OUT_MUTATION } from '../../lib/api';
import { useSnackbar } from '../../context/snackbarState';
import useUser from './User';

const LogOut = () => {
  const user = useUser();
  const snackbar = useSnackbar();
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
    try {
      logOut();
      snackbar.setSnackbarMessage(`Later ${user.name}`);
      snackbar.setSnackbarType('success');
      snackbar.openSnackbar();
      snackbar.setCloseButton(false);
      router.push('/');
      let timer = '';
      new Promise(() => {
        timer = setTimeout(() => {
          snackbar.closeSnackbar();
        }, 3000);
      }).then(() => () => clearTimeout(timer));
    } catch (err) {
      snackbar.setSnackbarMessage(
        'Something went wrong, please try logging out again.'
      );
      snackbar.setSnackbarType('error');
      snackbar.openSnackbar();
      snackbar.setCloseButton(true);
      console.log(err);
    }
  };

  return (
    <button onClick={handleLogOut} type="button">
      Log Out
    </button>
  );
};

export default LogOut;
