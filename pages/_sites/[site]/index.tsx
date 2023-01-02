import React from 'react';

const Index = ({ project }: any) => {
  console.log(project);
  return <h1>{project.data}</h1>;
};

export async function getStaticPaths() {
  const url = new URL('http://id.innoco.com/page');
  const id = url.host.split('.')[0];
  const paths = [{ params: { site: id } }, { params: { site: 'test2' } }];

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async (context: any) => {
  const data = [
    { domain: 'id', data: 'My first test project' },
    { domain: 'test2', data: 'My second test project' },
  ];

  const project = data.find((p) => p.domain === context.params.site); //fetching 요청

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project },
  };
};

export default Index;
