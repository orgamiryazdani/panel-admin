import CreateProductForm from "../components/products/CreateProductForm";
import AppLayout from "../layouts/AppLayout";

const CreateProduct = () => {
  return (
    <AppLayout sidebar={<p>amir</p>}>
      <div className='w-full h-full'>
        <CreateProductForm />
      </div>
    </AppLayout>
  );
};

export default CreateProduct;
