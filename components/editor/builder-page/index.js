import { useState, useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import { useContext } from "react";
import BuilderContext from "../../../store/builderContext";
import loadSavePanels from "../panels/save-panels";
import ImageBlock from "../blocks/image-block";
import { useMediaCtx } from "../../../store/mediaContext";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

function Editor() {
  const [builder, setBuilder] = useState(null);
  const builderCtx = useContext(BuilderContext);
  const [setting, setSetting] = useState(
    "https://www.google.co.id/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
  );
  const { showModal, modal } = useMediaCtx();
  console.log(modal);

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
      ImageBlock(editor, showModal);

      setBuilder(editor);
    }
  }, [setting]);

  return (
    <>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
      </div>
      <div id="gjs" />
      <div id="blocks" />
      <button
        onClick={() => {
          showModal();
          console.log(modal);
        }}
      >
        Change modal
      </button>
    </>
  );
}

export default Editor;
