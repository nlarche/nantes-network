import xs from 'xstream';
import {div, h1, select, option} from '@cycle/dom';

import networking from './networking'

function getBody(results) {
  return div('.container', [
    h1('#title', ['Nantes Network']),
    select('#lines', [
      option({ value: 'circle' }, ['Circle line']),
      option({ value: 'northern' }, ['Northern line']),
      option({ value: 'bakerloo' }, ['Bakerloo line']),
      option({ value: 'central' }, ['Central line']),
      option({ value: 'district' }, ['District line']),
      option({ value: 'piccadilly' }, ['Piccadilly line']),
      option({ value: 'victoria' }, ['Victora line']),
    ]),
    div('.result', results),
  ])
}

function view(state$) {
  return state$.map(state => getBody(state))
}

function intent(DOM) {
  return {
    station$: xs.of({}),
    line$: xs.of({})
  }
}

export default function main(sources) {
  const response$ = networking.processResponse(sources.HTTP);
  const actions = intent(sources.DOM);
  // const state$ = model(response$, actions);
  const vtree$ = view(actions.station$);
  const stationRequest$ = networking.getRequestURL(actions.line$);

  return {
    DOM: vtree$,
    HTTP: stationRequest$
  };
}
