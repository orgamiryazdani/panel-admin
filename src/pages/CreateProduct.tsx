import CreateProductForm from "../components/products/CreateProductForm";
import ProductDemo from "../components/products/ProductDemo";
import AppLayout from "../layouts/AppLayout";

const CreateProduct = () => {
  return (
    <AppLayout sidebar={<ProductDemo />}>
      <div className='w-full h-full'>
        <CreateProductForm />
      </div>
    </AppLayout>
  );
};

export default CreateProduct;
