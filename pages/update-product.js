import UpdateProduct from '../components/layout/UpdateProduct';

const updateProductPage = ({ query }) => {
  console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
};

export default updateProductPage;
