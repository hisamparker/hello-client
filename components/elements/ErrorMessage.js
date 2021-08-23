import styled from 'styled-components';

const ErrorMessage = ({ error, errorMessage }) => {
  if (errorMessage) {
    console.log(errorMessage);
    return (
      <ErrorContainer>
        <p>{errorMessage}</p>
      </ErrorContainer>
    );
  }
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorContainer key={i}>
        <p data-test="graphql-error">
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorContainer>
    ));
  }
  return (
    <ErrorContainer>
      <p data-test="graphql-error">
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorContainer>
  );
};

ErrorMessage.defaultProps = {
  error: {},
};

const ErrorContainer = styled.article`
  background-color: var(--ErrorLight);
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 5px solid var(--Error);
  p {
    margin: 0;
  }
`;

export default ErrorMessage;
