import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';
import useForm from '../../lib/useForm';
import ErrorMessage from '../layout/ErrorMessage';
// TODO create better messaging and redirect
// The mutation redeemUserPasswordResetToken lets the user reset their password by redeeming the token.
// You need to provide a sendToken function which can be used by sendUserPasswordResetLink to send the generated token to the user.
// It is expected that you will use these mutations as part of a password reset workflow within your frontend application.
const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token }) => {
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
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the form from submitting
    try {
      console.log(inputs);
      const res = await resetPassword();
      console.log(res);
      console.log({ data, loading, error });
      resetForm();
      // Send the email and password to the graphqlAPI
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <ErrorMessage error={error || successfulError} />
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
