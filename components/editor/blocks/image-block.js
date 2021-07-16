function ImageBlock(editor, imageSrc) {
  const blockManager = editor.Blocks;
  const componentManager = editor.Components;

  componentManager.addType("next-image", {
    model: {
      defaults: {
        style: {
          width: "250px",
          height: "400px",
        },
        tagName: "img",
        attributes: {
          src: "",
          id: "",
        },
        testprop: imageSrc,
      },
    },
  });

  blockManager.add("Next-Image", {
    label: "Next-Image",
    content: { type: "next-image" },
  });
}

export default ImageBlock;
