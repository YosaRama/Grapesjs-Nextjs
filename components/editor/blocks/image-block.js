function ImageBlock(editor, setting) {
  const blockManager = editor.Blocks;
  const componentManager = editor.Components;

  console.log(setting);
  const script1 = setting;

  componentManager.addType("next-image", {
    model: {
      defaults: {
        style: {
          width: "250px",
          height: "400px",
        },
        tagName: "img",
        attributes: {
          src: "http://localhost:3000/images/chad-montano-MqT0asuoIcU-unsplash.jpg",
        },
        script: script1,
        myProps1: setting,
        "script-props": ["myProps1"],
      },
    },
  });

  blockManager.add("Next-Image", {
    label: "Next-Image",
    content: { type: "next-image" },
  });
}

export default ImageBlock;
