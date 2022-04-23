import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();

  console.log("id:", id);

  return (
    <div>
      <h1>Diary</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nam quos rerum atque consequatur eligendi commodi. Quaerat praesentium numquam odit deserunt nihil asperiores quae.
        Perspiciatis dolor similique nam autem commodi.
      </p>
    </div>
  );
};

export default Diary;
