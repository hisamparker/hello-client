import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { CURRENT_USER_QUERY, LOG_OUT_MUTATION } from '../../lib/api';
import { useSnackbar } from '../../context/snackbarState';
import useUser from './User';
import { capitalizeFirstLetter } from '../../lib/capitalizeFirstLetter';

const LogOut = () => {
  const user = useUser();
  const snackbar = useSnackbar();
  const router = useRouter();

  const [logOut] = useMutation(LOG_OUT_MUTATION, {
    // we refetch so that we rerender
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleLogOut = async () => {
    try {
      await logOut();
      router.push('/');
      snackbar.setSnackbarMessage(`Later ${capitalizeFirstLetter(user)}`);
      snackbar.openSnackbar();
      let timer = '';
      new Promise(() => {
        timer = setTimeout(() => {
          snackbar.closeSnackbar();
        }, 3000);
      }).then(() => () => clearTimeout(timer));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledLogout onClick={handleLogOut} type="button">
      Log Out
    </StyledLogout>
  );
};

const StyledLogout = styled.button`
  color: var(--Primary);
  text-decoration: none;
  padding: 1rem 3rem 0;
  display: flex;
  align-items: center;
  position: relative;
  text-transform: uppercase;
  font-size: 2rem;
  background: none;
  border: 0;
  @media (max-width: 750px) {
    padding: 0 1rem;
    letter-spacing: 0.1rem;
  }
`;

export default LogOut;
