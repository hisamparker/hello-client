import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../../lib/useForm';
import ErrorMessage from '../layout/ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

// TODO add sign up button

export const LOG_IN_MUTATION = gql`
  mutation LOG_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;
const LogIn = () => {
  const router = useRouter();
  console.log('q', router.query);
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  // login is the function we get back from useMutation
  const [logIn, { data, loading }] = useMutation(LOG_IN_MUTATION, {
    variables: inputs,
    // we also want to refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await logIn();
      console.log(res);
      resetForm();
      router.push('/');
    } catch (err) {
      console.error(err.message);
      resetForm();
    }
  };

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data.authenticateUserWithPassword
      : undefined;

  return (
    // we MUST specify post here otherwise the password shows up in the params
    <form method="POST" onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
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