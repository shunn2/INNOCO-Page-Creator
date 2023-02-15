import React, { useState, useEffect } from "react";
import CreateSection from "../../../../components/createElement/createSection";
import CreateGuestBook from "../../../../components/dataComponent/guestBook";
import api from "../../../api/Api";

interface PageJSON {
  main: any;
  sectionOrder: string[];
  title: string;
}

interface PageInformation {
  pageId: string;
  pageJson: PageJSON;
  pageName: string;
}

interface createElementProps {
  element: any;
}

const Index = (props) => {
  const wildcard = props.wildcard;
  const projectName = props.project;
  const pageName = props.page;

  const [pageInformation, setPageInformation] = useState<PageInformation>({
    pageId: "",
    pageName: "",
    pageJson: { title: "", sectionOrder: [], main: {} },
  });

  const fetchPageInfo = async () => {
    const data = await api.getPageInfo({
      loginId: wildcard,
      projectName,
      pageName,
    });
    setPageInformation({ ...data, pageJson: JSON.parse(data.pageJson) });
  };

  const createChild = ({ element }: createElementProps) => {
    const props = {
      ...element.props,
      id: element.id,
      key: element.id,
      draggable: false,
    };
    if (element.tag === "img") return React.createElement(element.tag, props);
    return React.createElement(element.tag, props, element.content);
  };

  const createParent = ({ element }: createElementProps) => {
    const props = {
      ...element.parentProps,
      id: `parent_${element.id}`,
      key: `parent_${element.id}`,
    };
    return React.createElement("div", props, createChild({ element }));
  };

  useEffect(() => {
    fetchPageInfo();
  }, []);

  return (
    <div>
      {pageInformation.pageJson.sectionOrder.map((sectionId, sectionIdx) => {
        return (
          <div key={sectionId}>
            {pageInformation.pageJson.main[sectionId].dataComponent ===
            "guestBook" ? (
              <CreateGuestBook
                dataComponent={pageInformation.pageJson.main[sectionId]}
                ownerLoginId={wildcard}
                projectName={projectName}
                pageName={pageName}
              />
            ) : (
              <CreateSection
                sectionId={sectionId}
                mainData={pageInformation.pageJson.main}
              >
                {pageInformation.pageJson.main[sectionId].children.map(
                  (element, elementIdx) => (
                    <div key={element.id}>{createParent({ element })}</div>
                  )
                )}
              </CreateSection>
            )}
          </div>
        );
      })}
    </div>
  );
};

export async function getServerSideProps(context) {
  const params = context.params;
  const wildcard = context.req.headers.host.split(".")[0];
  const project = params.project;
  const page = params.page;

  return { props: { wildcard, project, page } };
}

export default Index;