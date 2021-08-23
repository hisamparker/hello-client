import { useMutation } from '@apollo/client';
import useForm from '../../lib/useForm';
import { REQUEST_RESET_MUTATION } from '../../lib/api';
import { useSnackbar } from '../../context/snackbarState';
import Button from '../elements/Button';
import {
  StyledForm,
  StyledFieldset,
  StyledLabel,
  StyledInput,
} from '../styles/Form';

// keystone offers options for sending password reset to users, we need to handle email sending, they handle the token creating and redemption
// The mutation sendUserPasswordResetLink allows you to send a reset token to a user.
// We must set this option up in the keystone config when we create auth: https://keystonejs.com/docs/apis/auth

// the stuff returned from sendUserPasswordResetLink looks like
// itemId: '61923804830924h',
// identity: 'emailthatisentered@toreset.com',
// token '2mzFdfgljldfjgldjlskg'

const RequestReset = ({ classProp }) => {
  const snackbar = useSnackbar();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signup, { loading }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); // stop the form from submitting
      const res = await signup();
      console.log(res);
      resetForm();
      snackbar.setSnackbarMessage(
        `Success! We've sent a reset link to ${res.email}!`
      );
      snackbar.setSnackbarType('success');
      snackbar.openSnackbar();
      snackbar.setCloseButton(false);

      let timer = '';
      new Promise(() => {
        timer = setTimeout(() => {
          snackbar.closeSnackbar();
        }, 3500);
      }).then(() => () => clearTimeout(timer));
    } catch (err) {
      snackbar.setSnackbarMessage(`Something went wrong :/`);
      snackbar.setSnackbarType('error');
      snackbar.openSnackbar();
      snackbar.setCloseButton(true);
      resetForm();
    }
  };
  return (
    <article className={classProp}>
      <StyledForm method="POST" onSubmit={handleSubmit}>
        <h2>Request a Password Reset</h2>
        <StyledFieldset>
          <StyledLabel htmlFor="email">
            Email
            <StyledInput
              type="email"
              name="email"
              placeholder="Your Email Address"
              autoComplete="email"
              value={inputs.email}
              onChange={handleChange}
              disabled={loading}
            />
          </StyledLabel>
          <Button variant="primary" type="submit">
            Request Reset!
          </Button>
        </StyledFieldset>
      </StyledForm>
    </article>
  );
};

export default RequestReset;
