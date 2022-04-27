import React from "react";

const ControlMenu = React.memo(({ value, optionList, onChange }) => {
  return (
    <>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="ControlMenu">
        {optionList.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
});

ControlMenu.defaultProps = {
  value: "value1",
  optionList: [
    { value: "value1", name: "name1" },
    { value: "value2", name: "name2" },
  ],
  onChange: () => {},
};

export default ControlMenu;
