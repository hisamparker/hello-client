import ProductDetail from '../../components/FutureComponents/ProductDetail';

export default function productDetailPage({ query }) {
  return <ProductDetail id={query.id} />;
}
