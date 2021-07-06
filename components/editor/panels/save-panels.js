function loadSavePanels(editor, command) {
  const panelManager = editor.Panels;

  panelManager.addPanel({
    id: "basic-actions",
    el: ".panel__basic-actions",
    buttons: [
      {
        id: "show-json",
        className: "btn-show-json",
        label: "Save",
        context: "show-json",
        command,
      },
    ],
  });
}

export default loadSavePanels;
