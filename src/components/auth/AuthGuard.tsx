import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../common/Loading";
import { UserAccount } from "../../types/Auth";
import useProfile, { useGetAccessToken } from "../../hooks/useUsers";

const cookies = new Cookies();

const AuthGuard = () => {
  const { data, isLoading, error } = useProfile();
  const { mutateAsync, isPending, isSuccess } = useGetAccessToken();

  if (error) {
    const accounts = JSON.parse(
      localStorage.getItem("AllEmailAccount") || "[]",
    );
    const emailSelected = accounts.find(
      (account: UserAccount) => account.selected === true,
    )?.email;

    const refreshToken = cookies.get(`refresh-token-${emailSelected}`);
    if (refreshToken) {
      mutateAsync(refreshToken);
    }
  }

  if (isLoading || isPending)
    return (
      <div className='w-svw h-svh flex items-center justify-center'>
        <Loading
          width='120'
          height='90'
        />
      </div>
    );

  return data || isSuccess ? <Outlet /> : <Navigate to='/signin' />;
};

export default AuthGuard;