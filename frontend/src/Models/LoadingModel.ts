import { BehaviorSubject } from 'rxjs';

const activeCallsSubject = new BehaviorSubject<number>(0);

export const LoadingModel = {
  activeCallsSubject,
  activeCalls: activeCallsSubject.asObservable(),
  increaseActiveCalls: () => activeCallsSubject.next(activeCallsSubject.value + 1),
  decreaseActiveCalls: () => activeCallsSubject.next(activeCallsSubject.value - 1),
  get activeCallsValue() {
    return activeCallsSubject.value;
  }
};
