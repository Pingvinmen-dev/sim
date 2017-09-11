# simobs

Simple observer with less than `2 ** 4` lines of code.

## Install

```bash
$ npm i -s simobs
```

## Usage

```js
import Simobs from 'simobs'

let obs = new Simobs

// Subscribe.
obs.sub(() => 42)

// Push states.
obs.v({1: 1})

// Push an unchanged state.
obs.v({1: 1})
// => undefined

// Push a new state.
obs.v({1: 2})
// => 42

// No deepdiff (diffing with `===' only).
obs.v(420, false)
```

## License

ISC
