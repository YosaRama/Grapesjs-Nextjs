import { useState, useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import { useContext } from "react";
import BuilderContext from "../../../store/builderContext";
import loadSavePanels from "../panels/save-panels";
import ImageBlock from "../blocks/image-block";
import { useMediaCtx } from "../../../store/mediaContext";
import { Modal } from "antd";

function Editor() {
  const [builder, setBuilder] = useState(null);
  const builderCtx = useContext(BuilderContext);
  const { showModal, modal, imageSrc, setImageSrc } = useMediaCtx();
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (!builder) {
      var GrapesJS = require("grapesjs");
      var gjsPresetWebpage = require("grapesjs-preset-webpage");

      const editor = GrapesJS.init({
        container: "#gjs",
        plugins: ["gjs-preset-webpage"],
        pluginsOpts: {
          "gjs-preset-webpage": {},
        },
      });

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
        console.log(`imageSrc`, selectedImage);
        setSelectedImage(
          "http://localhost:3000/images/chad-montano-MqT0asuoIcU-unsplash.jpg"
        );
      });

      editor.on(`component:selected`, (target) => {
        target.setAttributes({ src: imageSrc });
      });

      setBuilder(editor);
    }
  }, [selectedImage]);

  return (
    <>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
      </div>
      <div id="gjs" />
      <div id="blocks" />
      <Modal visible={modal}>
        <h1>This is Media Library</h1>
      </Modal>
      <button
        onClick={() => {
          test();
        }}
      >
        change image
      </button>
    </>
  );
}

export default Editor;
