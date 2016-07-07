import xs from 'xstream';
import {div, h1, p} from '@cycle/dom';

import Select from './select/select'
import List from './list/list'

function loading(){
  return div('loading ...')
}

function getBody(state, selectVDom, listVDom) {
  return div('.container', [
    h1('#title', ['Nantes Network']),
    p('select'),
    selectVDom ? selectVDom: loading(),
    p('list'),
    listVDom ? listVDom : loading()
  ])
}

function view(state$, selectVDom$, listVDom$) {
  const select$= selectVDom$.startWith(null)
  const list$= listVDom$.startWith(null)  
  return xs.combine(state$, select$, list$)
    .map(([state, selectVDom, listVDom]) => getBody(state, selectVDom, listVDom))
}

export default function main(sources) { 

  const select = Select({ DOM: sources.DOM, HTTP: sources.HTTP });
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
