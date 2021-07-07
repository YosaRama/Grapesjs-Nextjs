function Page(props) {
  const html = String(props.data.data.content);
  const styles = String(props.data.data.styles);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
      <style dangerouslySetInnerHTML={{ __html: styles }}></style>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const result = await fetch(`http://localhost:3000/api/builder/${query.id}`);
  const data = await result.json();
  return {
    props: {
      data: data,
    },
  };
};

export default Page;
