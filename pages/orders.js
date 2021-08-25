import Head from 'next/head';
import React from 'react';
import OrdersWithMutation from '../components/layout/OrdersWithMutation';

const orders = () => (
  <>
    <Head>
      {/* now the tab will say exactly what's in the title instead of just something random */}
      <title>Hello Tutorials | Orders</title>
    </Head>
    <div style={{ width: '100%' }}>
      <OrdersWithMutation />
    </div>
  </>
);

export default orders;
