import type { MarkExtensionConfig, ResolvedMarkExtension } from './types';

export const Mark = {
  /**
   * Create a mark extension from a config object.
   * Returns a resolved mark extension instance ready for registration.
   */
  create(config: MarkExtensionConfig): ResolvedMarkExtension {
    return {
      kind: 'mark',
      name: config.name,
      priority: config.priority ?? 100,
      config,
      options: config.addOptions?.() ?? {},
      storage: config.addStorage?.() ?? {},
    };
  },
};
