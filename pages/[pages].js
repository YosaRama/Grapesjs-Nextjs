import { Fragment } from "react";
import { useRouter } from "next/router";

function Page(props) {
  const router = useRouter();
  const html = String(props.data.data.content);
  const styles = String(props.data.data.styles);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
      <style dangerouslySetInnerHTML={{ __html: styles }}></style>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const result = await fetch(
    `http://localhost:3000/api/builder/${context.params.pages}`
  );
  const data = await result.json();
  return {
    props: {
      data: data,
    },
  };
};

export default Page;
