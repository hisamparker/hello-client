import RequestReset from '../components/auth/RequestReset';
import Reset from '../components/auth/Reset';

const resetPage = ({ query }) => {
  if (!query?.token) {
    return (
      <section>
        <p>You need a token to reset your password!</p>
        <RequestReset />
      </section>
    );
  }
  return (
    <div>
      <h1>Reset your password {query.token}</h1>
      <Reset token={query.token} />
    </div>
  );
};

export default resetPage;
