import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../../lib/useForm';
import {
  CURRENT_USER_QUERY,
  SIGNUP_MUTATION,
  LOG_IN_MUTATION,
} from '../../lib/api';
import { useSnackbar } from '../../context/snackbarState';
import Button from '../elements/Button';
import {
  StyledForm,
  StyledFieldset,
  StyledLabel,
  StyledInput,
} from '../styles/Form';
import ErrorMessage from '../elements/ErrorMessage';

const SignUp = () => {
  const [isError, setIsError] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('');
  const snackbar = useSnackbar();
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
  const [signup, { data }] = useMutation(SIGNUP_MUTATION, {
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
      const res = await signup();
      if (res.data.createUser.__typename === 'User') {
        setIsLoggedInUser({
          email: inputs.email,
          password: inputs.password,
        });
        resetForm();
        await login();
        router.push('/');
        // Send the email and password to the graphqlAPI
        snackbar.setSnackbarMessage(
          `Hey! welcome to hello tutorials ${inputs.name}`
        );
        snackbar.openSnackbar();
        let timer = '';
        new Promise(() => {
          timer = setTimeout(() => {
            snackbar.closeSnackbar();
          }, 3000);
        }).then(() => () => clearTimeout(timer));
      }
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
    <StyledForm method="POST" onSubmit={handleSubmit}>
      {isError && isErrorMessage && (
        <ErrorMessage errorMessage={isErrorMessage} />
      )}
      <h2>Sign Up For an Account</h2>
      <StyledFieldset>
        {data?.createUser && (
          <p>Signed up with {data.createUser.email}, yay!</p>
        )}
        <StyledLabel htmlFor="email">
          Your Name
          <StyledInput
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </StyledLabel>
        <StyledLabel htmlFor="email">
          Email
          <StyledInput
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </StyledLabel>
        <StyledLabel htmlFor="password">
          Password
          <StyledInput
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </StyledLabel>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </StyledFieldset>
    </StyledForm>
  );
};

export default SignUp;
