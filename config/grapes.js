const { useState, useEffect } = require("react");
import "grapesjs/dist/css/grapes.min.css";
import useBuilder from "../hooks/builder";
import { useContext } from "react";
import BuilderContext from "../store/builderContext";

function GrapesHandle() {
  const [editor, setEditor] = useState(null);
  const modalCtx = useContext(BuilderContext);

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
              modalCtx.showModal();
              modalCtx.setHtml(editor.getHtml());
              modalCtx.setStyles(editor.getCss());
            },
          },
        ],
      });

      const pageManager = e.Pages;

      pageManager.add({
        id: "new-page-id", // without an explicit ID, a random one will be created
        styles: `.my-class { color: red }`, // or a JSON of styles
        component: '<div class="my-class">My element</div>', // or a JSON of components
      });

      e.setComponents("");

      setEditor(e);
    }
  });
}

export default GrapesHandle;
