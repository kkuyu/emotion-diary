const MyButton = ({ text, type, status, onClick }) => {
  const realStatus = ["positive", "negative"].includes(status) ? status : "default";

  return (
    <>
      <button type={type} className={["MyButton", `MyButton_${realStatus}`].join(" ")} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

MyButton.defaultProps = {
  text: "MyButton",
  type: "button",
  status: "default",
  onClick: () => console.log("click"),
};

export default MyButton;
