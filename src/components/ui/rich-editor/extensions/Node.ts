import type { NodeExtensionConfig, ResolvedNodeExtension } from './types';

export const Node = {
  /**
   * Create a node extension from a config object.
   * Returns a resolved node extension instance ready for registration.
   */
  create(config: NodeExtensionConfig): ResolvedNodeExtension {
    const nodeTypes = Array.isArray(config.nodeType)
      ? config.nodeType
      : [config.nodeType];

    return {
      kind: 'node',
      name: config.name,
      priority: config.priority ?? 100,
      config,
      options: config.addOptions?.() ?? {},
      storage: config.addStorage?.() ?? {},
      nodeTypes,
    };
  },
};
