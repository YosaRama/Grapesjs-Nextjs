import { useState, useEffect, Fragment } from "react";
import "grapesjs/dist/css/grapes.min.css";

const Homepage = () => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editor) {
      var GrapesJS = require("grapesjs");
      var gjsPresetWebpage = require("grapesjs-preset-webpage");

      const e = GrapesJS.init({
        container: "#gjs",
        fromElement: true,
        plugins: ["gjs-preset-webpage"],
        pluginsOpts: {
          "gjs-preset-webpage": {},
        },
        panels: {},
      });

      const panelManager = e.Panels;

      panelManager.addPanel({
        id: "panel-top",
        el: ".panel__top",
      });

      panelManager.addPanel({
        id: "basic-actions",
        el: ".panel__basic-actions",
        buttons: [
          {
            id: "export",
            className: "btn-open-export",
            label: "Exp",
            command: "export-template",
            context: "export-template", // For grouping context of buttons from the same panel
          },
          {
            id: "show-json",
            className: "btn-show-json",
            label: "Save",
            context: "show-json",
            command(editor) {
              console.log("html", editor.getHtml());
              console.log("css", editor.getCss());
            },
          },
        ],
      });

      setEditor(e);
    }
  });

  return (
    <Fragment>
      <div class="panel__top">
        <div class="panel__basic-actions"></div>
      </div>
      <div id="gjs" />
      <div id="blocks" />
    </Fragment>
  );
};

export default Homepage;
