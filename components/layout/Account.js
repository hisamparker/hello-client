import useUser from '../auth/User';
import OrdersWithMutation from './OrdersWithMutation';
import UserDetail from './UserDetail';
import RequestReset from '../auth/RequestReset';
import MyTutorials from './MyTutorials';

const Account = () => {
  const user = useUser();
  return !user ? (
    <p>Hey, you don't have an account, why you here?</p>
  ) : (
    <article>
      <h1>Hello {user.name}</h1>
      <UserDetail user={user} />
      <RequestReset />
      <MyTutorials />
      <OrdersWithMutation />
    </article>
  );
};

export default Account;
