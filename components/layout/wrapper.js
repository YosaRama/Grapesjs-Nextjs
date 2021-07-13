function Wrapper(props) {
  return <div {...props}>{props.children}</div>;
}

export default Wrapper;
