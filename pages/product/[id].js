import ProductDetail from '../../components/layout/ProductDetail';

export default function productDetailPage({ query }) {
  return <ProductDetail id={query.id} />;
}
