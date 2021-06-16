import { useState, useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import { useContext } from "react";
import BuilderContext from "../store/builderContext";
import { useSinglePage } from "../hooks/builder";
import { useRouter } from "next/router";

function GrapesHandle() {
  const router = useRouter();
  const [editor, setEditor] = useState(null);
  const builderCtx = useContext(BuilderContext);
  const pageTitle = router.query.pageTitle;
  const { data: pageData, onEdit } = useSinglePage(pageTitle);
  const pageContent = pageData?.data?.data?.content;
  const pageStyles = pageData?.data?.data?.styles;

  useEffect(() => {
    if (pageContent && pageStyles) {
      var GrapesJS = require("grapesjs");
      var gjsPresetWebpage = require("grapesjs-preset-webpage");

      const e = GrapesJS.init({
        container: "#single-gjs",
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
            label: "Update",
            context: "show-json",
            command(editor) {
              onEdit({
                content: editor.getHtml(),
                styles: editor.getCss(),
              });
              router.replace("/");
            },
          },
        ],
      });

      e.setComponents(String(pageContent));
      e.setStyle(String(pageStyles));

      setEditor(e);
    }
  }, [pageContent, pageStyles]);
}

export default GrapesHandle;
