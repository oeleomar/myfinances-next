import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await clerkClient().users.getUser(userId);

  if (user.publicMetadata.subscriptionPlan === "PRO") {
    return true;
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (currentMonthTransactions <= 10) {
    return false;
  }

  return true;
};
