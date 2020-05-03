import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App.js';

const injectHTML = (data, body) => {
  const newData = data.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div>`,
  );
  return newData;
};
const htmlData = fs.readFileSync(path.resolve(__dirname, '..', 'build', 'index.html'), 'utf8');
export default (req, res) => {
  const context = {};
  const body = renderToString(
    <StaticRouter location={req.path} context={context}>
      <App />
    </StaticRouter>,
  );
  if (context.url) {
    res.redirect(context.url);
    return res.end();
  }
  const html = injectHTML(htmlData, body);
  res.send(html);
};
