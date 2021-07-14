import { createContext, useState, useContext } from "react";

const MediaContext = createContext({
  imageSrc: null,
  modal: false,
  showModal: function () {},
  closeModal: function () {},
  setImageSrc: function (imageSrc) {},
});

export function MediaContextProvider(props) {
  const [isModalShow, setModalShow] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  function showModalHandler() {
    setModalShow(true);
  }

  function closeModalHandler() {
    setModalShow(false);
  }

  function imageSrcHandler(imageSrc) {
    setImageSrc(imageSrc);
  }

  const context = {
    imageSrc: imageSrc,
    modal: isModalShow,
    showModal: showModalHandler,
    closeModal: closeModalHandler,
    setImageSrc: imageSrcHandler,
  };

  return (
    <MediaContext.Provider value={context}>
      {props.children}
    </MediaContext.Provider>
  );
}

export default MediaContext;

export const useMediaCtx = () => useContext(MediaContext);
