import { useMutation, gql } from '@apollo/client';
import useForm from '../../lib/useForm';
import ErrorMessage from '../ErrorMessage';

// keystone offers options for sending password reset to users, we need to handle email sending, they handle the token creating and redemption
// The mutation sendUserPasswordResetLink allows you to send a reset token to a user.
// We must set this option up in the keystone config when we create auth: https://keystonejs.com/docs/apis/auth
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    #   we pass a single value, email
    sendUserPasswordResetLink(email: $email) {
      # we retrieve a code a message if not successful
      # do not EVER put this in browser
      code
      message
    }
  }
`;
// the stuff returned from sendUserPasswordResetLink looks like
// itemId: '61923804830924h',
// identity: 'emailthatisentered@toreset.com',
// token '2mzFdfgljldfjgldjlskg'

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await signup().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
    // Send the email and password to the graphqlAPI
  }
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
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
        <button type="submit">Request Reset!</button>
      </fieldset>
    </form>
  );
}

export default RequestReset;
