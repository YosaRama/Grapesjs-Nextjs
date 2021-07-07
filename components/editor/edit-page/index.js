import { useState, useEffect, Fragment } from "react";
import "grapesjs/dist/css/grapes.min.css";
import { useSinglePage } from "../../../hooks/builder";
import { useRouter } from "next/router";
import loadUpdatePanels from "../panels/update-panels";

function Editor(props) {
  const router = useRouter();
  const [builder, setBuilder] = useState(null);
  const id = router.query.id;
  const { data: pageData, onEdit } = useSinglePage(id);
  const pageContent = pageData?.data?.data?.content;
  const pageStyles = pageData?.data?.data?.styles;

  useEffect(() => {
    if (pageContent && pageStyles) {
      var GrapesJS = require("grapesjs");
      var gjsPresetWebpage = require("grapesjs-preset-webpage");

      // Initialize Grape JS
      const editor = GrapesJS.init({
        container: "#single-gjs",
        plugins: ["gjs-preset-webpage"],
        pluginsOpts: {
          "gjs-preset-webpage": {},
        },
      });

      // Update Panel
      const panelManager = editor.Panels;
      const commandUpdate = function command(editor) {
        onEdit({
          content: editor.getHtml(),
          styles: editor.getCss(),
        });
        router.replace("/dashboard");
        panelManager.removePanel({
          id: "basic-actions",
        });
      };

      loadUpdatePanels(editor, commandUpdate);

      // Set Content Editor
      editor.setComponents(String(pageContent));
      editor.setStyle(String(pageStyles));

      setBuilder(editor);
    }
  }, [pageContent, pageStyles]);

  return (
    <Fragment>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
      </div>
      <div id="single-gjs" />
      <div id="blocks" />
    </Fragment>
  );
}

export default Editor;
