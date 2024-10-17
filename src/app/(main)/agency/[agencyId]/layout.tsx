import BlurPage from "@/components/global/Blur-page";
import InfoBar from "@/components/global/InfoBar";
import Sidebar from "@/components/sidebar";
import Unauthorized from "@/components/unauthorized";
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const Layout = async ({ children, params }: LayoutProps) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) return redirect("/");
  if (!agencyId) return redirect("/agency");

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "ADMIN"
  ) {
    return <Unauthorized />;
  }

  let allNotification: any = [];

  const notification = await getNotificationAndUser(agencyId);

  if (notification) allNotification = notification;

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">
        <InfoBar notifications={allNotification} />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default Layout;
