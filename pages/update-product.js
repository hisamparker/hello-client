import UpdateProduct from '../components/FutureComponents/UpdateProduct';

const updateProductPage = ({ query }) => {
  console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
};

export default updateProductPage;
