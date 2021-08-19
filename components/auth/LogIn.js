import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../../lib/useForm';
import { CURRENT_USER_QUERY, LOG_IN_MUTATION } from '../../lib/api';
import { useSnackbar } from '../../context/snackbarState';
import Button from '../elements/Button';
import {
  StyledForm,
  StyledFieldset,
  StyledLabel,
  StyledInput,
} from '../styles/Form';

// TODO add sign up button

const LogIn = () => {
  const snackbar = useSnackbar();
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  // login is the function we get back from useMutation
  const [logIn, { loading }] = useMutation(LOG_IN_MUTATION, {
    variables: inputs,
    // we also want to refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await logIn();
      if (
        res.data.authenticateUserWithPassword.__typename ===
        'UserAuthenticationWithPasswordSuccess'
      ) {
        router.push('/my-tutorials');
      }
      if (
        res.data.authenticateUserWithPassword.__typename ===
        'UserAuthenticationWithPasswordFailure'
      ) {
        snackbar.setSnackbarMessage(
          'Something went wrong, please try logging in again.'
        );
        snackbar.setSnackbarType('error');
        snackbar.openSnackbar();
        snackbar.setCloseButton(true);
      }
      resetForm();
    } catch (err) {
      snackbar.setSnackbarMessage(
        'Something went wrong, please try logging in again.'
      );
      snackbar.setSnackbarType('error');
      snackbar.openSnackbar();
      snackbar.setCloseButton(true);
      resetForm();
    }
  };

  return (
    // we MUST specify post here otherwise the password shows up in the params
    <StyledForm method="POST" onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <StyledFieldset>
        <StyledLabel htmlFor="email">
          Email
          <StyledInput
            type="email"
            name="email"
            placeholder="Email"
            // most browsers will already try to complete this just says heeeey is an email
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </StyledLabel>
        <StyledLabel htmlFor="password">
          <div>Password</div>
          <StyledInput
            type="password"
            name="password"
            placeholder="Password"
            // most browsers will already try to complete this just says heeeey is an password
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </StyledLabel>
        <Button styleProp="primary" disabled={loading} type="submit">
          Log in
        </Button>
      </StyledFieldset>
    </StyledForm>
  );
};

export default LogIn;
