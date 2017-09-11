export default class Simobs {
  sub (f) { if (this.subs) this.subs.push(f); else this.subs = [f] }
  v (s, deep = true) {
    if (deep ? this._deepdiff(s) : this._diff(s)) { if (typeof (this.s) !== 'undefined') this._notify(); this.s = s }
  }
  _notify () { this.subs.forEach(f => { f() }) }
  _diff (s) { return this.s !== s }
  _deepdiff (s) {
    if ([this.s, s].map(o => typeof (o) !== 'object').every(Boolean)) return this.s !== s
    const props = [this.s, s].map(o => o ? Object.getOwnPropertyNames(o) : [])
    if (!props.map(p => p.length).reduce((a, v) => a === v ? a : NaN)) return true
    if (!props[0].map((p, i) => p === props[1][i]).every(Boolean)) return true
    return !props[0].map((p, i) => this.s[p] === s[props[1][i]]).every(Boolean)
  }
}
