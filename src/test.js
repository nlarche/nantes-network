import xs from 'xstream';
import {div, h1} from '@cycle/dom';
export default function main(sources) {
  let request$ = xs.of({
    url: 'http://localhost:3000/ewp/arrets.json', // GET method by default
    category: 'hello',
  });

  let response$ = sources.HTTP
    .select('hello')
    .flatten();

  let vdom$ = response$
    .map(res => res.text) // We expect this to be "Hello World"
    .startWith('Loading...')
    .map(text =>
      div('.container', [
        h1(text)
      ])
    );

  return {
    DOM: vdom$,
    HTTP: request$
  };
}
