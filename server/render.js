import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import RouterApp from './RouterApp.jsx';


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
    RouterApp(req, context),
  );
  if (context.url) {
    res.redirect(context.url);
    return res.end();
  }
  const html = injectHTML(htmlData, body);
  res.send(html);
};
