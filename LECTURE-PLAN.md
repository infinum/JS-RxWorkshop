# Lecture #1 - The Basics

## Topics

- async actions on frontend with vanilla JS
- What is Rx
    - Observer design pattern
    - Language-specific implementations like RxJS, RxSwift, RxJava
- Observable life-cycle
    - Creation, emitting, disposal
- Comparison to fetch
- Types of Observables
    - Hot/Cold
    - Different Subjects

## Homework

1. Wrap `XHR` or abortable `fetch` into Observable
    - Cancel the request if subscriber unsubscribes before the request has finished
2. Wrap `setInterval` into Observable
    - Stop interval on unsubscribe
3. Wrap button clicks into Observable

_Note:_ No cheats! Do not use `fromEvent()` or `from()`

# Lecture #2 - Operators

## Topics

Go over most important operators by type and show some use-cases. Explain some terminology (inner/outer observable).

- Combination
    - `combineLatest`, `zip`, `concat`, `forkJoin`, `merge`, `startWith`
- Conditional
    - `every`, `iif`
- Creation
    - `Observable.create`, `empty`, `from`, `fromEvent`, `throwError`, `of`, `interval`, `timer`
- Error handling
    - `catchError`, `retry`, `retryWhen`
- Multicasting
    - `share`, `shareReplay`
- Filtering
    - `auditTime`, `debounceTime`, `throttleTime`, `filter`, `find`, `first`, `skip`, `distinct`, `distinctUntilChanged`, `distinctUntilKeyChanged`
- Transformation
    - `map`, `mergeMat / flatMap`, `switchMap`, `scan`, `reduce`
- Utility
    - `tap`, `delay`, `finalize`

## Homework

1. Use the wrapped XHR/fetch observable and some operators to create search functionality
    - Consider what happens if user types a lot and fast
    - Consider the order in which responses come back
    - Consider cancelling unnecessary requests (or not make them at all)
