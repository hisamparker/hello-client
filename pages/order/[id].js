import OrderDetail from '../../components/layout/OrderDetail';

export default function orderDetailPage({ query }) {
  return <OrderDetail id={query.id} />;
}
