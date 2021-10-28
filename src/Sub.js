import AddSubnew from "./AddSubnew";
import { useParams } from "react-router";
import data from "./data";

const Sub = ({ setSubroute }) => {
  const { name } = useParams();
  console.log(name);
  setSubroute(name);
  const obj = data.filter((d) => d.name === name);
  console.log(obj);
  return (
    <div>
      <AddSubnew data={obj} />
    </div>
  );
};

export default Sub;
