import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../../lib/useForm';
import { RESET_MUTATION } from '../../lib/api';
import { useSnackbar } from '../../context/snackbarState';
// TODO create better messaging and redirect

// The mutation redeemUserPasswordResetToken lets the user reset their password by redeeming the token.
// You need to provide a sendToken function which can be used by sendUserPasswordResetLink to send the generated token to the user.
// It is expected that you will use these mutations as part of a password reset workflow within your frontend application.
const Reset = ({ token }) => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  // sometimes keystone's error doesn't work, so we create our own error handling to grab the error sent back from the mutation
  // I think this may be because we need to await the error?
  // TODO ask Michael
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the form from submitting
    try {
      const res = await resetPassword();
      snackbar.setSnackbarMessage(`Yay! You're good to log in.`);
      snackbar.setSnackbarType('success');
      snackbar.openSnackbar();
      snackbar.setCloseButton(false);
      resetForm();
      router.push('/log-in');
      console.log(res);
      let timer = '';
      new Promise(() => {
        timer = setTimeout(() => {
          snackbar.closeSnackbar();
        }, 3000);
      }).then(() => () => clearTimeout(timer));
      // Send the email and password to the graphqlAPI
    } catch (err) {
      snackbar.setSnackbarMessage(`Something went wrong.`);
      snackbar.setSnackbarType('error');
      snackbar.openSnackbar();
      snackbar.setCloseButton(true);
      resetForm();
      console.log(err);
      console.log(error);
    }
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can Now sign in</p>
        )}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </form>
  );
};

export default Reset;

Reset.propTypes = {
  token: PropTypes.string,
};
