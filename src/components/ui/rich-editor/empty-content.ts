import { EditorNode, TextNode } from "./types";
import { generateId } from "./utils/id-generator";

/**
 * Creates minimal empty content for normal rich editor mode.
 * 
 * Returns 1 empty paragraph block ready for editing.
 * No headers, no cover images - just a clean, empty block.
 *
 * @returns Array with a single empty paragraph node
 */
export function createEmptyContent(): EditorNode[] {
  return [
    {
      id: generateId("p"),
      type: "p",
      content: "",
      attributes: {},
    } as TextNode,
  ];
}

