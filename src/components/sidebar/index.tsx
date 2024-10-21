import { getAuthUserDetails } from "@/lib/queries";
import MenuOptions from "./MenuOptions";

interface SidebarProps {
  id: string;
  type: "agency" | "subaccount";
}

const Sidebar = async ({ id, type }: SidebarProps) => {
  const user = await getAuthUserDetails();
  if (!user) return null;

  if (!user.Agency) return;

  const details =
    type === "agency"
      ? user.Agency
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  if (!details) return;

  const isWhiteLabeledAgency = user.Agency.whiteLabel;

  let sidebarLogo = user.Agency.agencyLogo || "/assets/plura-logo.svg";

  if (!isWhiteLabeledAgency) {
    if (type === "subaccount") {
      sidebarLogo =
        user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOpt =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || [];

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    )
  );

  return (
    <>
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOpt}
        defaultOpen={true}
        subAccount={subaccounts}
        user={user}
      />

      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOpt}
        subAccount={subaccounts}
        user={user}
      />
    </>
  );
};

export default Sidebar;
