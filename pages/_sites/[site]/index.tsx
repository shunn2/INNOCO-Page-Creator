import React from 'react';
import { useRouter } from 'next/router';

const Index = ({ wildcard }: any) => {
  const router = useRouter();
  //console.log(router.pathname);
  return <h1>{wildcard}</h1>;
};

// export async function getStaticPaths() {
//   const url = new URL('http://id.innoco.com/page');
//   const id = url.host.split('.')[0];
//   const paths = [{ params: { site: id } }, { params: { site: 'test2' } }];

//   return {
//     paths: paths,
//     fallback: 'blocking',
//   };
// }

// export const getStaticProps = async (context: any) => {
//   const data = [
//     { domain: 'id', data: 'My first test project' },
//     { domain: 'test2', data: 'My second test project' },
//   ];

//   console.log(context);

//   const project = data.find((p) => p.domain === context.params.site); //fetching 요청

//   if (!project) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { project },
//   };
// };

export async function getServerSideProps(context: any) {
  const wildcard = context.req.headers.host.split('.')[0];

  return { props: { wildcard } };
}

export default Index;
