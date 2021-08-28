import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import useForm from '../../lib/useForm';
import { CURRENT_USER_QUERY, LOG_IN_MUTATION } from '../../lib/api';
import Button from '../elements/Button';
import {
  StyledForm,
  StyledFieldset,
  StyledLabel,
  StyledInput,
} from '../styles/Form';
import ErrorMessage from '../elements/ErrorMessage';

const LogIn = () => {
  const [isError, setIsError] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('');
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
          'UserAuthenticationWithPasswordSuccess' &&
        res.data.authenticateUserWithPassword.item.tutorials.length > 0
      ) {
        return router.push('/my-tutorials');
      }
      if (
        res.data.authenticateUserWithPassword.__typename ===
        'UserAuthenticationWithPasswordSuccess'
      ) {
        return router.push('/');
      }
      if (
        res.data.authenticateUserWithPassword.__typename ===
        'UserAuthenticationWithPasswordFailure'
      ) {
        setIsError(true);
        setErrorMessage(`Something went wrong, please try logging in again.`);
        let timer = '';
        new Promise(() => {
          timer = setTimeout(() => {
            setIsError(false);
            setErrorMessage('');
          }, 5000);
        }).then(() => () => clearTimeout(timer));
      }
      resetForm();
    } catch (err) {
      setIsError(true);
      setErrorMessage(`Something went wrong, please try logging in again.`);
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
    // we MUST specify post here otherwise the password shows up in the params
    <>
      <Head>
        {/* now the tab will say exactly what's in the title instead of just something random */}
        <title>Hello Tutorials | Log In</title>
      </Head>
      <StyledForm method="POST" onSubmit={handleSubmit}>
        {isError && isErrorMessage && (
          <ErrorMessage
            close={() => setIsError()}
            errorMessage={isErrorMessage}
          />
        )}
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
            Password
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
          <Button variant="primary" disabled={loading} type="submit">
            Log in
          </Button>
        </StyledFieldset>
      </StyledForm>
    </>
  );
};

export default LogIn;
