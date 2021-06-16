import { Fragment } from "react";
import TitleModal from "../../components/modal/TitleModal";
import GrapesHandle from "../../config/grapes";
import { useContext } from "react";
import BuilderContext from "../../store/builderContext";

const Homepage = () => {
  const modal = useContext(BuilderContext);
  GrapesHandle();
  return (
    <Fragment>
      {modal.modal && <TitleModal />}
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
      </div>
      <div id="gjs" />
      <div id="blocks" />
    </Fragment>
  );
};

export default Homepage;
