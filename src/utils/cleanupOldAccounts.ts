import { UserAccount } from "../types/Auth";

export const cleanupOldAccounts = () => {
  const accounts: UserAccount[] = JSON.parse(localStorage.getItem("AllEmailAccount") || "[]");
  const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;

  const updatedAccounts = accounts.filter(account => account.addedTime > twelveHoursAgo);

  if (updatedAccounts.length !== accounts.length) {
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
  }
};