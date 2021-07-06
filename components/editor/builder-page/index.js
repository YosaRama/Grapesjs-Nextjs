import { useState, useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import { useContext } from "react";
import BuilderContext from "../../../store/builderContext";
import { loadSavePanels } from "../panels/save-panels";

function Editor() {
  const [builder, setBuilder] = useState(null);
  const builderCtx = useContext(BuilderContext);

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

      // Save Panels
      const commandSave = function command(editor) {
        builderCtx.showModal();
        builderCtx.setHtml(editor.getHtml());
        builderCtx.setStyles(editor.getCss());
      };

      loadSavePanels(editor, commandSave);

      const blockManager = editor.BlockManager;

      blockManager.add("some-block-id", {
        label: `<div>
            <img src="https://picsum.photos/70/70"/>
            <div class="my-label-block">Label block</div>
          </div>`,
        content: "<div><h1>Yosa Rama</h1></div>",
      });

      // This is our custom script (avoid using arrow functions)
      const script = function () {
        return (
          <div>
            <h1>Yosa rama</h1>
          </div>
        );
      };

      // Define a new custom component
      editor.Components.addType("comp-with-js", {
        model: {
          defaults: {
            script,
            // Add some style, just to make the component visible
            style: {
              width: "100px",
              height: "100px",
            },
          },
        },
      });

      editor.addComponents(`<div>
      <span data-gjs-type="custom-component" data-gjs-prop="someValue" title="foo">
        Hello!
      </span>
    </div>`);

      // Create a block for the component, so we can drop it easily
      editor.Blocks.add("test-block", {
        label: "Test block",
        attributes: { class: "fa fa-text" },
        content: { type: "comp-with-js" },
      });

      editor.setComponents("");

      setBuilder(editor);
    }
  });

  return (
    <>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
      </div>
      <div id="gjs" />
      <div id="blocks" />
    </>
  );
}

export default Editor;
