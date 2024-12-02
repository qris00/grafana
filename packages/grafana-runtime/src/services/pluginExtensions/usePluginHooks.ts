import { UsePluginHooksOptions, UsePluginHooksResult } from './getPluginExtensions';

export type UsePluginHooks<T> = (options: UsePluginHooksOptions) => UsePluginHooksResult<T>;

let singleton: UsePluginHooks<any> | undefined;

export function setUsePluginHook(hook: UsePluginHooks<any>): void {
  // We allow overriding the registry in tests
  if (singleton && process.env.NODE_ENV !== 'test') {
    throw new Error('setUsePluginHook() function should only be called once, when Grafana is starting.');
  }
  singleton = hook;
}

export function usePluginHooks<T>(options: UsePluginHooksOptions): UsePluginHooksResult<T> {
  if (!singleton) {
    throw new Error('usePluginHooks(options) can only be used after the Grafana instance has started.');
  }
  return singleton(options);
}
