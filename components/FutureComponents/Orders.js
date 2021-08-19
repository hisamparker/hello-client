import useUser from '../auth/User';
import OrderDetail from '../layout/OrderDetail';

const Orders = ({ classProp }) => {
  const user = useUser();
  return (
    <article className={classProp}>
      {user && user.orders ? (
        user.orders.map((order) => <OrderDetail id={order.id} key={order.id} />)
      ) : (
        <p>No Orders yet</p>
      )}
    </article>
  );
};

export default Orders;
