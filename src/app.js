import xs from 'xstream';
import {div, h1, select, option} from '@cycle/dom';

import networking from './networking'
import Select from './select'


function getBody(results, selectVDom, selectValue) {
  return div('.container', [
    h1('#title', ['Nantes Network']),
    selectVDom,
    selectValue.value   ,
    div('.result', results),
  ])
}

function view(state$, selectVDom$, selectValue$) {
  return xs.combine(state$, selectVDom$, selectValue$)
    .map(([state, selectVDom, selectValue]) => getBody(state, selectVDom, selectValue))
}

export default function main(sources) {

  const childSources = { DOM: sources.DOM, HTTP: sources.HTTP, props: xs.of({}) };
  const select = Select(childSources)
  const selectVDom$ = select.DOM;
  const selectVHttp$ = select.HTTP;
  const selectValue$ = select.value;

  const vtree$ = view(xs.of({}), selectVDom$, selectValue$);

  return {
    DOM: vtree$,
    HTTP: selectVHttp$
  };
}
