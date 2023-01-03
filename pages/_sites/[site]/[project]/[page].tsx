import React from 'react';

const Index = (props: any) => {
  const wildcard = props.wildcard;
  const project = props.project;
  const page = props.page;

  return (
    <h1>
      {wildcard} {project} {page}
    </h1>
  );
};

export async function getServerSideProps(context: any) {
  const params = context.params;
  const wildcard = params.site;
  const project = params.project;
  const page = params.page;
  return { props: { wildcard, project, page } };
}

export default Index;
