import { useState, useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import { useContext } from "react";
import BuilderContext from "../store/builderContext";

function GrapesHandle() {
  const [editor, setEditor] = useState(null);
  const builderCtx = useContext(BuilderContext);

  useEffect(() => {
    if (!editor) {
      var GrapesJS = require("grapesjs");
      var gjsPresetWebpage = require("grapesjs-preset-webpage");

      const e = GrapesJS.init({
        container: "#gjs",
        plugins: ["gjs-preset-webpage"],
        pluginsOpts: {
          "gjs-preset-webpage": {},
        },
      });

      const panelManager = e.Panels;

      panelManager.addPanel({
        id: "basic-actions",
        el: ".panel__basic-actions",
        buttons: [
          {
            id: "show-json",
            className: "btn-show-json",
            label: "Save",
            context: "show-json",
            command(editor) {
              builderCtx.showModal();
              builderCtx.setHtml(editor.getHtml());
              builderCtx.setStyles(editor.getCss());
            },
          },
        ],
      });

      e.setComponents("");

      setEditor(e);
    }
  });
}

export default GrapesHandle;
