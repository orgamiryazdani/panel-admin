import CreateUserForm from "../components/users/CreateUserForm";
import UserDemo from "../components/users/UserDemo";
import AppLayout from "../layouts/AppLayout";

const CreateUser = () => {
  return (
    <AppLayout sidebar={<UserDemo />}>
      <CreateUserForm />
    </AppLayout>
  );
};

export default CreateUser;
