import React from "react";

const SubaccountPageId = ({ params }: { params: { subaccountId: string } }) => {
  console.log(params.subaccountId);

  return <div>single subaccount SubaccountPageId</div>;
};

export default SubaccountPageId;
