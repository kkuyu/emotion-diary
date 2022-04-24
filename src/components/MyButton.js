const MyButton = ({ text, type, status, isHidden, customClass, onClick }) => {
  const realStatus = ["positive", "negative"].includes(status) ? status : "default";

  return (
    <>
      <button type={type} className={["MyButton", `MyButton_${realStatus}`, customClass].join(" ")} onClick={onClick}>
        {isHidden ? <div className="hidden">{text}</div> : text}
      </button>
    </>
  );
};

MyButton.defaultProps = {
  text: "MyButton",
  type: "button",
  status: "default",
  isHidden: false,
  customClass: "",
  onClick: () => console.log("click"),
};

export default MyButton;
