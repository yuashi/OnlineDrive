import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Navigation = ({ subroute }) => {
  const handleClick = () => {
    console.log("Breadcrumb clicked");
  };
  let url = `/+${subroute}`;

  return (
    <div role="presentation" onClick={handleClick} className="header">
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">
          <img src="./imgs/arrow_up.png" id="back" />
        </Link>
        <Link underline="hover" color="inherit" href="/">
          root
        </Link>
        <Link underline="hover" color="inherit" href={url}>
          {subroute}
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default Navigation;
