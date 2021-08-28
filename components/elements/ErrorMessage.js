import styled, { css } from 'styled-components';
import Button from './Button';

const ErrorMessage = ({ error, errorMessage, close }) => {
  if (errorMessage) {
    console.log(errorMessage);
    return (
      <ErrorContainer close={close}>
        <StyledButtonWrapper>
          {close && (
            <Button variant="naked" onClick={close}>
              X
            </Button>
          )}
        </StyledButtonWrapper>
        <p>{errorMessage}</p>
      </ErrorContainer>
    );
  }
  console.log('close', close);
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorContainer close={close} key={i}>
        <StyledButtonWrapper>
          {close && (
            <Button variant="naked" onClick={close}>
              X
            </Button>
          )}
        </StyledButtonWrapper>
        <p data-test="graphql-error">
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorContainer>
    ));
  }
  return (
    <ErrorContainer close={close}>
      <StyledButtonWrapper>
        {close && (
          <Button variant="naked" onClick={close}>
            X
          </Button>
        )}
      </StyledButtonWrapper>
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
  position: relative;
  background-color: var(--ErrorLight);
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 5px solid var(--Error);
  display: grid;
  ${({ close }) =>
    close &&
    css`
      padding-top: 0;
    `}
  p {
    margin: 0;
  }
`;

const StyledButtonWrapper = styled.div`
  justify-self: end;
`;

export default ErrorMessage;
