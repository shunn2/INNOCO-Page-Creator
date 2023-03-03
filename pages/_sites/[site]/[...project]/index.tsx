import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const router = useRouter();
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
    if (!data) {
      return;
    }

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
    setIsDarkMode(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    fetchPageInfo();
  }, []);

  return (
    <div>
      {pageInformation.pageId.length ? (
        pageInformation.pageJson.sectionOrder.map((sectionId, sectionIdx) => {
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
        })
      ) : (
        <NotFound darkmode={isDarkMode}>Page Not Found</NotFound>
      )}
    </div>
  );
};

const NotFound = styled.div<{ darkmode }>`
  font-size: 45px;
  color: ${(props) => (props.darkmode ? "white" : "black")};
`;

export async function getServerSideProps(context) {
  const params = context.params;

  const wildcard = context.req.headers.host.split(".")[0];
  const project = params.project[0];
  const page = params.project[1] || "";

  return { props: { wildcard, project, page } };
}

export default Index;
