import CreateCategoryForm from "../components/category/CreateCategoryForm";
import CategoryDemo from "../components/category/CtegoryDemo";
import AppLayout from "../layouts/AppLayout";

const CreateCategory = () => {
  return (
    <AppLayout sidebar={<CategoryDemo />}>
      <CreateCategoryForm />
    </AppLayout>
  );
};

export default CreateCategory;
