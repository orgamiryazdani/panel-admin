import Cookies from "universal-cookie";

const cookies = new Cookies();

export const cleanupOldAccounts = () => {
  const allUser = JSON.parse(localStorage.getItem("AllEmailAccount") || "[]");
  const fourHoursAgo = Date.now() - 4 * 60 * 60 * 1000; // 4 hours in milliseconds

  const updatedAccounts = allUser.filter(({ email, addedTime }: { email: string; addedTime: number }) => {
    const presenceCookie = cookies.get(`refresh-token-${email}`);
    return presenceCookie || addedTime >= fourHoursAgo;
  });

  if (updatedAccounts.length !== allUser.length) {
    if (updatedAccounts.length > 0) {
      updatedAccounts[0].selected = true;
    }
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
    window.location.reload();
  }
};
