import React from "react";

const Sidebar = () => {
  const sidebarMenu = ['Boards','Members','Workspace Settings','Table','Calendar']
  return <div className={`p-3 mw-[300px] w-[300px] border-t h-[810px] max-h-fit`}>
    {sidebarMenu.map((item)=><div key={item} className="mt-2">{item}</div>)}
  </div>;
};

export default Sidebar;
// mw-[300px] bg-blue-100 text-start pl-2 border h-[810px] max-h-fit pr-20