import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <ul>
      <li>
        <Link to={"/"}>HOME</Link>
      </li>
      <li>
        <Link to={"/diary"}>DIARY</Link>
      </li>
      <li>
        <Link to={"/new"}>NEW</Link>
      </li>
      <li>
        <Link to={"/edit"}>EDIT</Link>
      </li>
    </ul>
  );
};

export default RouteTest;
