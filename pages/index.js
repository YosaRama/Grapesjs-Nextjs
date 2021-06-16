import { useBuilder } from "../hooks/builder";
import { Fragment } from "react";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  const { data: pagesListing, error, onDelete } = useBuilder();
  const pagesList = pagesListing?.data?.result;

  const handlerPreview = (permalink) => {
    router.push("/" + permalink);
  };

  const handleEdit = (currentTitle) => {
    router.push("/builder/" + currentTitle);
  };

  const handleDelete = (currentId) => {
    onDelete(currentId);
  };

  const handleCreate = () => {
    router.push("/builder");
  };

  return (
    <Fragment>
      {pagesList && (
        <div>
          {pagesList.map((page) => {
            return (
              <div key={page.id}>
                <h1>{page.title}</h1>
                <div>
                  <button onClick={() => handlerPreview(page.title)}>
                    Preview page
                  </button>
                  <button onClick={() => handleEdit(page.title)}>
                    Edit page
                  </button>
                  <button onClick={() => handleDelete(page.id)}>
                    Delete page
                  </button>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: "50px" }}>
            <button onClick={() => handleCreate()}>Create New Page</button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Dashboard;
