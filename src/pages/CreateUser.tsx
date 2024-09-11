import CreateUserForm from "../components/users/CreateUserForm";
import AppLayout from "../layouts/AppLayout";

const CreateUser = () => {
  return (
    <AppLayout sidebar={<p></p>}>
      <CreateUserForm />
    </AppLayout>
  );
};

export default CreateUser;
