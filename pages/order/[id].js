import Head from 'next/head';
import OrderDetail from '../../components/layout/OrderDetail';

export default function orderDetailPage({ query }) {
  return (
    <>
      <Head>
        {/* now the tab will say exactly what's in the title instead of just something random */}
        <title>Hello Tutorials | Order: {query.id}</title>
      </Head>
      <OrderDetail id={query.id} />
    </>
  );
}
