import useUser from '../auth/User';
import OrderDetail from './OrderDetail';

const Orders = () => {
  const user = useUser();
  return (
    <>
      {user && user.orders ? (
        user.orders.map((order) => <OrderDetail id={order.id} key={order.id} />)
      ) : (
        <p>No Orders yet</p>
      )}
    </>
  );
};

export default Orders;
