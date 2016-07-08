import xs from 'xstream';
import {div} from '@cycle/dom';

import Style from './list.css'
import networking from './networking'

function getInfo(station){
  return div('.infoStation ' + Style.infoStation, [
    div('.title ' + Style.numLigne , [
      station.ligne.numLigne ? div(["Ligne " + station.ligne.numLigne]): '',
      div(station.terminus)]),
    div('.typeligne' , [station.ligne.typeLigne]),
    div('.temps ' + Style.temps, [station.temps]),
  ])
}

function getListe(state) {
  if (state.station) {
    return div('.liste ' + Style.liste,
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
