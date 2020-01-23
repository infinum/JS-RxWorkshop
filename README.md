# RxJS Workshop

The workshop consists of 4 lectures:

- [1. Lecture - The Basics](#1.-lecture---the-basics)
- [2. Lecture - Operators](#2.-lecture---operators)
- [3. Lecture - Use cases examples](#3.-lecture---use-cases-examples)
- [4. Lecture - Angular-specific use cases](#4.-lecture---angular-specific-use-cases)

Each lecture has a presentation and some lectures have homework tasks.

Homework tasks are placed in `src/lecture-#/homework`. Each task has `.ts` and `.spec.ts` files. Write your implementation in `.ts` file and verify your solution by executing the already written set of tests with `npm test`. Feel free to add additional tests. Try solving the homework tasks in-between lectures (i.e. solve Lecture #1 tasks after Lecture #1 presentation and before Lecture #2). At the start of each lecture we will discuss homework tasks from previous lecture and answer any questions.

## 1. Lecture - The Basics

### 1.1. Topics

- What is `Rx`
    - Observer (or Pub-Sub) design pattern
        - [Observer vs Pub-Sub Pattern](https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c)
    - Language-specific implementations like `RxJS`, `RxSwift`, `RxJava`
- `Observable` life-cycle
    - Creation, emitting, disposal
- Types of `Observables`
    - Hot/Cold
    - Different `Subject`s
- Comparison to `Promise`s

### 1.2. Homework

_Note:_ For these homework tasks, do not use `fromEvent()`, `from()`, `timer()` or `interval()` function from `RxJS`.

### Task #1 - Wrap `setTimeout` into `Observable`
### Task #2 - Wrap `setInterval` into `Observable`
### Task #3 - Wrap `XHR` or abortable `fetch` into `Observable`
### Task #4 - Wrap button clicks into `Observable`

## 2. Lecture - Operators

### 2.1. Topics

Go over most important operators by type and show some use-cases. Explain some terminology (inner/outer `Observable`).

- Combination
    - `combineLatest`, `zip`, `concat`, `forkJoin`, `merge`, `startWith`
- Conditional
    - `every`, `iif`
- Creation
    - `new Observable`, `Observable.create`, `empty`, `from`, `fromEvent`, `throwError`, `of`, `interval`, `timer`
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

### 2.2. Homework

#### Task #1 - Fetch data from API and create model instance

`src/lecture-2/homework/fetch-person.ts` has `IPerson` interface and `Person` model class. `IPerson` interface describes data returned by `GET` `https://swapi.co/people/${id}/`

Your task is to implement `fetchPerson` method which fetches person data by id and returns an instance of `Person` model.

#### Task #2 - Use the wrapped XHR/fetch `observable` and some operators to create search functionality

Take into consideration:

- what happens if user types a lot and fast
- the order in which responses come back
- cancelling unnecessary requests (or not make them at all)

## 3. Lecture - Use cases examples

TBD...

## 4. Lecture - Angular-specific use cases

- Change Detection & `async` pipe
- Subscriptions and memory leaks
- Common pipelines examples
    - input$ -> debounceTime -> distinctUntilChanged -> http.get
- TBD...
