import React from "react";
type Props = {};
interface NavibarItem {
  key: string;
}

function Navibar({}: Props) {
  const [navibarList, setNavibarList] = React.useState<NavibarItem[]>([]);

  const getNavibarList = () => {

  }

  return (
    <div>
      navibar
      <div>
        {navibarList.map((item, index) => (
          <div key={index}>{item.key}</div>
        ))}
      </div>
    </div>
  );
}

export default Navibar;
