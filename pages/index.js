import { useBuilder, useSinglePage } from "../hooks/builder";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import BuilderContext from "../store/builderContext";

function Dashboard() {
  const router = useRouter();
  const { data: pagesListing, error } = useBuilder();
  const pagesList = pagesListing?.data?.result;
  const builderCtx = useContext(BuilderContext);

  const handlerPreview = (permalink) => {
    router.push("/" + permalink);
  };

  const handleEdit = (currentTitle) => {
    router.push("/builder/" + currentTitle);
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
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
}

export default Dashboard;
