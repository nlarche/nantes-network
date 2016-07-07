import xs from 'xstream';
import {div, h1, p} from '@cycle/dom';

import Select from './select/select'
import List from './list/list'

function getBody(results, selectVDom, listVDom) {
  return div('.container', [
    h1('#title', ['Nantes Network']),
    p('select'),
    selectVDom,
    p('list'),
    listVDom,
    div('.result', results),
  ])
}

function view(state$, selectVDom$, listVDom$) {
  return xs.combine(state$, selectVDom$, listVDom$)
    .map(([state, selectVDom, listVDom]) => getBody(state, selectVDom, listVDom))
}

export default function main(sources) { 

  const select = Select({ DOM: sources.DOM, HTTP: sources.HTTP, props: xs.of({}) });
  const selectVDom$ = select.DOM;
  const selectHttp$ = select.HTTP;
  const selectValue$ = select.value;  

  const list = List({ DOM: sources.DOM, HTTP: sources.HTTP, props$: selectValue$ });
  const listVDom$ = list.DOM;
  const listHttp$ = list.HTTP;

  const vtree$ = view(xs.of({}), selectVDom$, listVDom$);

  return {
    DOM: vtree$,
    HTTP: xs.merge(selectHttp$, listHttp$) 
  };
}
