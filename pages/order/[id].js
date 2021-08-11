import OrderDetail from '../../components/layout/OrderDetail';

export default function productDetailPage({ query }) {
  return <OrderDetail id={query.id} />;
}
