import { useRouter } from 'next/dist/client/router';
import Products from '../../components/layout/Products';
import Pagination from '../../components/layout/Pagination';

const ProductsPage = () => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <>
      <Pagination page={+page || 1} />
      <Products page={+page || 1} />
      <Pagination page={+page || 1} />
    </>
  );
};

export default ProductsPage;
