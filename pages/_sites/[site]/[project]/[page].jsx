import React, { useState, useEffect } from 'react';
import path from 'path';
import fsPromises from 'fs/promises';
const Index = (props) => {
  const wildcard = props.wildcard;
  const project = props.project;
  const page = props.page;
  const data = props.data.main;

  const Renderer = ({ el }) => {
    const children = el.children;
    const t = [el.content, ...children];

    return React.createElement(
      el.tag,
      {
        className: el.content,
        style: el.style,
      },
      t.map((c) => (typeof c === 'string' ? c : <Renderer el={c} key={c.id} />))
    );
  };
  return (
    <div>
      <h1>
        {wildcard} {project} {page}
      </h1>
      {data.map((el) => (
        <Renderer el={el} key={el.id} />
      ))}
    </div>
  );
};

export async function getServerSideProps(context) {
  const params = context.params;
  const wildcard = context.req.headers.host.split('.')[0];
  const project = params.project;
  const page = params.page;

  // console.log(res);

  const filePath = path.join(process.cwd(), `/data/${project}.json`);
  const jsonData = await fsPromises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return { props: { wildcard, project, page, data } };
}

export default Index;
