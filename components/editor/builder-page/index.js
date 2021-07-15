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

      // Load Image block
      ImageBlock(editor, showModal, imageSrc);

      editor.on(`block:drag:stop`, (target) => {
        showModal();
        target.setAttributes({
          src: "http://localhost:3000/images/chad-montano-MqT0asuoIcU-unsplash.jpg",
        });
      });

      setBuilder(editor);
    }
  }, []);

  return (
    <>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
      </div>
      <div id="gjs" />
      <div id="blocks" />
      <Modal visible={modal} title="Media Library" onCancel={closeModal}>
        <FileList />
      </Modal>
    </>
  );
}

export default Editor;
