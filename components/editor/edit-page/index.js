import { useState, useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import { useSinglePage } from "../../../hooks/builder";
import { useRouter } from "next/router";
import loadUpdatePanels from "../panels/update-panels";

function Editor() {
  const router = useRouter();
  const [builder, setBuilder] = useState(null);
  const pageTitle = router.query.pageTitle;
  const { data: pageData, onEdit } = useSinglePage(pageTitle);
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
      const commandUpdate = function command(editor) {
        onEdit({
          content: editor.getHtml(),
          styles: editor.getCss(),
        });
        router.replace("/");
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
}

export default Editor;
