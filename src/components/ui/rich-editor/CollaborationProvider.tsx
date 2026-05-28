import React, { createContext, useContext } from 'react';
import { useCollaboration } from './hooks/useCollaboration';
import type { CollabOptions, CollabState } from './collaboration/types';

// ─── Context ──────────────────────────────────────────────────────────────────

const CollaborationContext = createContext<CollabState | null>(null);

/**
 * Read the current collaboration state from the nearest
 * `<CollaborationProvider>`. Returns `null` when collaboration is not
 * active (i.e. the component is rendered outside a provider).
 */
export function useCollaborationState(): CollabState | null {
  return useContext(CollaborationContext);
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CollaborationProviderProps extends CollabOptions {
  children: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Wraps children in a collaboration context that maintains a Y.js
 * connection and syncs editor state bidirectionally.
 *
 * Props are identical to `CollabOptions` plus `children`.
 */
export function CollaborationProvider({
  children,
  roomId,
  serverUrl,
  user,
}: CollaborationProviderProps) {
  const collabState = useCollaboration({ roomId, serverUrl, user });

  return React.createElement(
    CollaborationContext.Provider,
    { value: collabState },
    children
  );
}
