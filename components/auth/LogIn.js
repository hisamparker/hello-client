import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../../lib/useForm';
import { CURRENT_USER_QUERY, LOG_IN_MUTATION } from '../../lib/api';
import { useSnackbar } from '../../context/snackbarState';

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
      resetForm();
      snackbar.setSnackbarMessage(
        `Hey! ${res.data.authenticateUserWithPassword.item.name}`
      );
      snackbar.setSnackbarType('success');
      snackbar.openSnackbar();
      snackbar.setCloseButton(false);
      let timer = '';
      new Promise(() => {
        timer = setTimeout(() => {
          snackbar.closeSnackbar();
        }, 3000);
      }).then(() => () => clearTimeout(timer));
    } catch (err) {
      snackbar.setSnackbarMessage(
        'Something went wrong, please try logging in again.'
      );
      snackbar.setSnackbarType('error');
      snackbar.openSnackbar();
      snackbar.setCloseButton(true);
      console.error(err.message);
      resetForm();
    }
  };

  // const error =
  //   data?.authenticateUserWithPassword.__typename ===
  //   'UserAuthenticationWithPasswordFailure'
  //     ? data.authenticateUserWithPassword
  //     : undefined;

  return (
    // we MUST specify post here otherwise the password shows up in the params
    <form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            // most browsers will already try to complete this just says heeeey is an email
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            // most browsers will already try to complete this just says heeeey is an password
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button disabled={loading} type="submit">
          Sign the heck in
        </button>
      </fieldset>
    </form>
  );
};

export default LogIn;
