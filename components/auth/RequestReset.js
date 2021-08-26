import { useMutation } from '@apollo/client';
import { useState } from 'react';
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
import ErrorMessage from '../elements/ErrorMessage';

// keystone offers options for sending password reset to users, we need to handle email sending, they handle the token creating and redemption
// The mutation sendUserPasswordResetLink allows you to send a reset token to a user.
// We must set this option up in the keystone config when we create auth: https://keystonejs.com/docs/apis/auth

// the stuff returned from sendUserPasswordResetLink looks like
// itemId: '61923804830924h',
// identity: 'emailthatisentered@toreset.com',
// token '2mzFdfgljldfjgldjlskg'

const RequestReset = ({ classProp }) => {
  const [isError, setIsError] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('');
  const snackbar = useSnackbar();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [requestReset, { loading, error, data }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: { email: inputs.email },
    }
  );
  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); // stop the form from submitting
      const res = await requestReset();
      console.log(res);
      resetForm();
      snackbar.snackbarFlow(
        `Success! We've sent a reset link to ${res.email}!`
      );
    } catch (err) {
      setIsError(true);
      setErrorMessage(
        `Something went wrong, please check your info and try again.`
      );
      let timer = '';
      new Promise(() => {
        timer = setTimeout(() => {
          setIsError(false);
          setErrorMessage('');
        }, 4000);
      }).then(() => () => clearTimeout(timer));
      resetForm();
    }
  };
  return (
    <article className={classProp}>
      <StyledForm method="POST" onSubmit={handleSubmit}>
        {isError && isErrorMessage && (
          <ErrorMessage errorMessage={isErrorMessage} />
        )}
        <h2>Request a Password Reset</h2>
        <StyledFieldset>
          <StyledLabel htmlFor="email">
            Email
            <StyledInput
              type="email"
              name="email"
              id="email"
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
