import { useState, useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import { useContext } from "react";
import BuilderContext from "../../../store/builderContext";
import loadSavePanels from "../panels/save-panels";
import ImageBlock from "../blocks/image-block";
import { useMediaCtx } from "../../../store/mediaContext";
import { Modal } from "antd";
import FileList from "../../libs/fileList";

function Editor() {
  const [builder, setBuilder] = useState(null);
  const [tempWidget, setTempWidget] = useState(null);
  const builderCtx = useContext(BuilderContext);
  const { showModal, modal, imageSrc, setImageSrc, closeModal } = useMediaCtx();

  useEffect(() => {
    var GrapesJS = require("grapesjs");
    var gjsPresetWebpage = require("grapesjs-preset-webpage");

    const editor = GrapesJS.init({
      container: "#gjs",
      plugins: ["gjs-preset-webpage"],
      pluginsOpts: {
        "gjs-preset-webpage": {},
      },
    });

    if (!builder) {
      // Set Page blank
      editor.setComponents("");

      // Save Panels
      const commandSave = function command(editor) {
        builderCtx.showModal();
        builderCtx.setHtml(editor.getHtml());
        builderCtx.setStyles(editor.getCss());
      };

      loadSavePanels(editor, commandSave);

      setBuilder(editor);
    }

    ImageBlock(editor, imageSrc);

    // Load Image block
    editor.on(`block:drag:stop`, (target) => {
      if (target && target.attributes.type === "next-image") {
        showModal();
        setTempWidget(target);
      }
    });
  }, [imageSrc]);

  function handleChangeImage() {
    console.log(builder);
    tempWidget.setAttributes({
      src: imageSrc,
    });
  }

  return (
    <>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
      </div>
      <div id="gjs" />
      <div id="blocks" />
      <Modal
        visible={modal}
        title="Media Library"
        onCancel={closeModal}
        onOk={() => handleChangeImage}
      >
        <FileList />
      </Modal>
    </>
  );
}

export default Editor;
