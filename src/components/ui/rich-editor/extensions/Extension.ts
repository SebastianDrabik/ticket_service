import type { ExtensionConfig, ResolvedExtension } from './types';

export const Extension = {
  /**
   * Create a functional extension from a config object.
   * Returns a resolved extension instance ready for registration.
   */
  create(config: ExtensionConfig): ResolvedExtension {
    return {
      kind: 'extension',
      name: config.name,
      priority: config.priority ?? 100,
      config,
      options: config.addOptions?.() ?? {},
      storage: config.addStorage?.() ?? {},
    };
  },
};
