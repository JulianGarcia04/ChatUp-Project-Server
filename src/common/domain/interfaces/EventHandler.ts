import type { Listerner } from './Listerner';

export interface EventHandler {
  listeners: Listerner[];
  subscribe(listener: Listerner): void;
  unSubscribe(listener: Listerner): void;
  notify(): void;
}
