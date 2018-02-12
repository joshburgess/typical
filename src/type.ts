import { And, Not } from './boolean';

export type InstanceType<T> = T extends new (...args: any[]) => infer U ? U : never;

export type Xor<T, A, B> = T extends A ? (T extends B ? never : T) : (T extends B ? T : never);

export type Matches<V, T> = V extends T ? '1' : '0';
export type TypesEqual<A, B> = And<Matches<A, B>, Matches<B, A>>;
export type InstanceOf<V, T> = And<Matches<V, T>, Not<Matches<T, V>>>;

export type Awaited<T> = {
  '0': T;
  '1': Awaited<T extends { then(onfulfilled: (value: infer U) => any): any; } ? U : 'wat'>;
}[Matches<T, { then(onfulfilled: (value: any) => any): any; }>];

// flatten a structure of nested tuples/arrays into a flat array type
export type Flatten<T> = {
  '0': T;
  '1': Flatten<T extends Array<infer U> ? U : 'wat'>;
}[Matches<T, any[]>];

// widen scalar types from literals to their parent types
export type Widen<T> =
  T extends boolean ? boolean :
  T extends number ? number :
  T extends string ? string :
  T;

// export type PrototypeOf<V, T> = ...
// ^ get the prototype (-> methods) of a type. `Partial` helps for e.g. tuple types if not object types, though `Symbol`-based keys get killed.

// export type Lambda<K> = any;
// export type TypeMap<F extends Lambda, Keys extends string> = Pick<F, Keys>[Keys];
// // nope, no type lambdas -- can't have unapplied types
