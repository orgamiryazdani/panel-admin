import CreateCategoryForm from "../components/category/CreateCategoryForm";
import AppLayout from "../layouts/AppLayout";

const CreateCategory = () => {
  return (
    <AppLayout sidebar={<p>live category</p>}>
      <CreateCategoryForm />
    </AppLayout>
  );
};

export default CreateCategory;
