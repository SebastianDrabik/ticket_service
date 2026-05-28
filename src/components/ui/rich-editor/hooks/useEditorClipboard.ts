import React, { useCallback, useMemo } from "react";
import {
  createHandleCopy,
  createHandlePaste,
  createHandleCut,
} from "../handlers/clipboard-handlers";
import type { ContainerNode } from "../types";
import type { EditorAction } from "../reducer/actions";

interface UseEditorClipboardParams {
  dispatch: React.Dispatch<EditorAction>;
  getContainer: () => ContainerNode;
  getActiveNodeId: () => string | null;
}

export function useEditorClipboard({
  dispatch,
  getContainer,
  getActiveNodeId,
}: UseEditorClipboardParams) {
  const clipboardParams = useMemo(
    () => ({
      getContainer,
      getActiveNodeId,
      dispatch,
    }),
    [getContainer, getActiveNodeId, dispatch]
  );

  const handleCopy = useCallback(createHandleCopy(clipboardParams), [
    clipboardParams,
  ]);

  const handlePaste = useCallback(createHandlePaste(clipboardParams), [
    clipboardParams,
  ]);

  const handleCut = useCallback(createHandleCut(clipboardParams), [
    clipboardParams,
  ]);

  return { handleCopy, handlePaste, handleCut };
}
