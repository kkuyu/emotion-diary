import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const test = searchParams.get("test");
  console.log("test:", test);

  return (
    <div>
      <h1>Edit</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nam quos rerum atque consequatur eligendi commodi. Quaerat praesentium numquam odit deserunt nihil asperiores quae.
        Perspiciatis dolor similique nam autem commodi.
      </p>
      <button type="button" onClick={() => setSearchParams({ foo: "lorem" })}>
        change
      </button>
      <button type="button" onClick={() => navigate("/new")}>
        go to new
      </button>
      <button type="button" onClick={() => navigate(-1)}>
        go back
      </button>
    </div>
  );
};

export default Edit;
