import Cookies from "universal-cookie";

const cookies = new Cookies();

export const cleanupOldAccounts = () => {
  const allUser = JSON.parse(localStorage.getItem("AllEmailAccount") || "[]");
  const thirtySecondsAgo = Date.now() - 30 * 1000;

  const updatedAccounts = allUser.filter(({ email, addedTime }: { email: string; addedTime: number }) => {
    const presenceCookie = cookies.get(`refresh-token-${email}`);
    return presenceCookie || addedTime >= thirtySecondsAgo;
  });

  if (updatedAccounts.length !== allUser.length) {
    if (updatedAccounts.length > 0) {
      updatedAccounts[0].selected = true;
    }
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
    window.location.reload();
  }
};
