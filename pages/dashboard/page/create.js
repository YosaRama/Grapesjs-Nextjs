import { Fragment } from "react";
import TitleModal from "../../../components/modal/TitleModal";
import Editor from "../../../components/editor/builder-page/index";
import { useContext } from "react";
import BuilderContext from "../../../store/builderContext";

const CreatePage = () => {
  const modal = useContext(BuilderContext);
  return (
    <Fragment>
      {modal.modal && <TitleModal />}
      <Editor />
    </Fragment>
  );
};

export default CreatePage;
