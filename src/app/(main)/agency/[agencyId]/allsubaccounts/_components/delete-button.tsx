"use client";

import {
  deleteSubaccount,
  getSubaccountDetails,
  saveActivitylogsNotification,
} from "@/lib/queries";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  subaccountId: string;
}

const DeleteButton = ({ subaccountId }: DeleteButtonProps) => {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        const response = await getSubaccountDetails(subaccountId);
        await saveActivitylogsNotification({
          agencyId: undefined,
          description: `Deleted a subaccount | ${response?.name}`,
          subaccountId,
        });
        await deleteSubaccount(subaccountId);
        router.refresh();
      }}
    >
      Delete Sub-Account
    </div>
  );
};

export default DeleteButton;
