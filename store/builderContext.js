import { createContext, useState } from "react";

const BuilderContext = createContext({
  html: null,
  styles: null,
  modal: false,
  showModal: function () {},
  closeModal: function () {},
  setHtml: function (html) {},
  setStyles: function (styles) {},
});

export function BuilderContextProvider(props) {
  const [isModalShow, setModalShow] = useState(false);
  const [contentHtml, setContentHtml] = useState("");
  const [contentStyles, setContentStyles] = useState("");

  function showModalHandler() {
    setModalShow(true);
  }

  function closeModalHandler() {
    setModalShow(false);
  }

  function contentHtmlHandler(html) {
    setContentHtml(html);
  }

  function contentStylesHandler(styles) {
    setContentStyles(styles);
  }

  const context = {
    html: contentHtml,
    styles: contentStyles,
    modal: isModalShow,
    showModal: showModalHandler,
    closeModal: closeModalHandler,
    setHtml: contentHtmlHandler,
    setStyles: contentStylesHandler,
  };

  return (
    <BuilderContext.Provider value={context}>
      {props.children}
    </BuilderContext.Provider>
  );
}

export default BuilderContext;
