import s from "./TitleModal.module.css";
import { useContext, useRef } from "react";
import BuilderContext from "../../store/builderContext";
import useBuilder from "../../hooks/builder";

function TitleModal() {
  const builderCtx = useContext(BuilderContext);
  const { onAdd } = useBuilder();
  const currentTitle = useRef();

  function handlerSubmit(e) {
    e.preventDefault();
    onAdd({
      title: currentTitle.current.value,
      content: builderCtx.html,
      styles: builderCtx.styles,
    });
    builderCtx.closeModal();
  }

  return (
    <div className={s.section}>
      <div className={s.container}>
        <form onSubmit={handlerSubmit}>
          <input
            title="Page Title"
            placeholder="Input your page title here"
            ref={currentTitle}
          />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
}

export default TitleModal;
