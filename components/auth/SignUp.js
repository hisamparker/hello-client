import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../../lib/useForm';
import ErrorMessage from '../ErrorMessage';
import {
  CURRENT_USER_QUERY,
  SIGNUP_MUTATION,
  LOG_IN_MUTATION,
} from '../../lib/api';

const SignUp = () => {
  // https://www.howtographql.com/react-apollo/5-authentication/ in tutorial, there's no auto login, I hate this, here's how the graphql docs suggest doing it
  const [isLoggedInUser, setIsLoggedInUser] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  const [login] = useMutation(LOG_IN_MUTATION, {
    variables: {
      email: isLoggedInUser.email,
      password: isLoggedInUser.password,
    },
    // when we log the user in, we refetch current user which resets the cache and updates the nav
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the form from submitting
    try {
      console.log(inputs);
      const res = await signup().catch(console.error);
      console.log(res);
      console.log({ data, loading, error });
      setIsLoggedInUser({
        email: inputs.email,
        password: inputs.password,
      });
      console.log(isLoggedInUser);
      resetForm();
      login();
      // TODO add success messaging either before redirecting (with a set timeout) or set messaging on the Page componnent so it shows everywhere and add success and fail to context or pass it up
      router.push('/');
      // Send the email and password to the graphqlAPI
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.createUser && (
          <p>Signed up with {data.createUser.email}, yay!</p>
        )}
        <label htmlFor="email">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign In!</button>
      </fieldset>
    </form>
  );
};

export default SignUp;
