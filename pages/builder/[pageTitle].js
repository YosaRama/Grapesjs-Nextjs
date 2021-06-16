import { Fragment } from "react";
import GrapesHandle from "../../config/singleGrapes";
import { useContext } from "react";
import BuilderContext from "../../store/builderContext";

const Homepage = () => {
  const modal = useContext(BuilderContext);
  GrapesHandle();
  return (
    <Fragment>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
      </div>
      <div id="single-gjs" />
      <div id="blocks" />
    </Fragment>
  );
};

export default Homepage;
