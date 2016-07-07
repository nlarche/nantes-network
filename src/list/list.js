import xs from 'xstream';
import {div} from '@cycle/dom';

import networking from './networking'

function getInfo(station){
  return div('.infoStation', [
    div('.numligne' , [station.ligne.numLigne]),
    div('.typeligne' , [station.ligne.typeLigne]),
    div('.terminus', [station.terminus]),
    div('.temps', [station.temps]),
  ])
}

function getListe(state) {
  if (state.station) {
    return div('.liste',
      state.station.map(st => getInfo(st))
    )
  } else {
    return div('loading...')
  }
}

function intent(sources) {
  return {
    station$: sources.props$
  }
}

function model(response$, actions) {
  const action$ = actions.station$.startWith('')
  return xs.combine(response$, action$);
}

function view(state$) {
  return state$.map(([state, value]) => getListe(state))
}

export default function List(sources) {
  const response$ = networking.processResponse(sources.HTTP);
  
  const actions = intent(sources);
  const state$ = model(response$, actions);
  const vtree$ = view(state$);
  
  const stationRequest$ = networking.getRequestURL(actions.station$);

  return {
    DOM: vtree$,
    HTTP: stationRequest$
  };
}
