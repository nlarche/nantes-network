import xs from 'xstream';
import {div, select, option} from '@cycle/dom';

import networking from './networking'

function getSelect(state) {  
  if (state.station) {
    return select('.station',
      state.station.map(st => option({ attrs: { value: st.codeLieu }}, [st.libelle]))
    )
  }
}

function intent(DOM) {
  return {
    station$: DOM.select('.station').events('change')
      .map(evt => {
        return {
          label: evt.target[evt.target.selectedIndex].innerHTML,
          value: evt.target.value
        }
      })
  }
}

function model(response$, actions) {
  const action$ = actions.station$.startWith({})
  return xs.combine(response$, action$);
}

function view(state$) {
  return state$.map(([state, value]) => getSelect(state))
}

export default function Select(sources) {
  const response$ = networking.processResponse(sources.HTTP);
  const actions = intent(sources.DOM);
  const state$ = model(response$, actions);
  const vtree$ = view(state$);
  const stationRequest$ = networking.getRequestURL();

  return {
    DOM: vtree$,
    HTTP: stationRequest$,
    value: state$.map(([state, value]) => value),

  };
}
