import useUser from '../auth/User';
import OrdersWithMutation from './OrdersWithMutation';
import UserDetail from './UserDetail';
import RequestReset from '../auth/RequestReset';
import MyTutorials from './MyTutorials';

const Account = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <UserDetail user={user} />
      <MyTutorials />
      <RequestReset />
      <OrdersWithMutation />
    </div>
  );
};

export default Account;
