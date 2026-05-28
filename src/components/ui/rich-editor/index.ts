export type {
  NodeType,
  BuiltInNodeType,
  NodeAttributes,
  BaseNode,
  TextNode,
  ContainerNode,
  StructuralNode,
  EditorNode,
  EditorState,
  SelectionInfo,
  InlineText,
  BlockLine,
  CoverImage,
  TextDirection,
  HistoryOperation,
  HistoryEntry,
} from './types';

export { isContainerNode, isStructuralNode, isTextNode, hasInlineChildren, getNodeTextContent } from './types';

// ============================================================================
// Actions
// ============================================================================
export type {
  UpdateNodeAction,
  UpdateAttributesAction,
  UpdateContentAction,
  DeleteNodeAction,
  InsertNodeAction,
  MoveNodeAction,
  DuplicateNodeAction,
  ReplaceContainerAction,
  ResetAction,
  BatchAction,
  EditorAction,
  ReplaceSelectionWithInlinesAction,
} from './reducer/actions';

export { EditorActions } from './reducer/actions';

// ============================================================================
// Reducer
// ============================================================================
export { editorReducer, createInitialState } from './reducer/editor-reducer';

// ============================================================================
// Zustand Store and Hooks
// ============================================================================
export {
  EditorProvider,
  useEditorState,
  useEditorDispatch,
  useBlockNode,
  useIsNodeActive,
  useActiveNodeId,
  useContainerChildrenIds,
  useContainer,
  useSelectionManager,
  useSelection,
  useEditorStoreInstance,
  useExtensionManager,
} from './store/editor-store';

export type { EditorProviderProps } from './store/editor-store';

// ============================================================================
// CMS Integration API
// ============================================================================
export { useEditorAPI, type EditorAPI } from './hooks/useEditorAPI';


// ============================================================================
// Utilities
// ============================================================================
export {
  findNodeById,
  findParentById,
  updateNodeById,
  deleteNodeById,
  insertNode,
  moveNode,
  cloneNode,
  traverseTree,
  validateTree,
  buildNodeMap,
} from './utils/tree-operations';

export type { InsertPosition } from './utils/tree-operations';

export {
  splitTextAtSelection,
  convertToInlineFormat,
  applyFormatting,
  removeFormatting,
  mergeAdjacentTextNodes,
  getFormattingAtPosition,
} from './utils/inline-formatting';

export {
  generateId,
  resetIdCounter,
} from './utils/id-generator';

export {
  serializeToHtml,
  serializeToHtmlFragment,
  serializeToHtmlWithClass,
} from './utils/serialize-to-html';

export {
  serializeToSemanticHtml,
  type SemanticHtmlOptions,
} from './utils/serialize-semantic-html';

export {
  parseMarkdownTable,
  isMarkdownTable,
} from './utils/markdown-table-parser';

export {
  serializeToMarkdown,
} from './utils/serialize-markdown';

export {
  parseMarkdownToNodes,
} from './utils/parse-markdown';

export {
  parseHtmlToNodes,
  parsePlainTextToNodes,
} from './utils/html-to-nodes';

export {
  setupDragAutoScroll,
  useDragAutoScroll,
} from './utils/drag-auto-scroll';

export type { AutoScrollConfig } from './utils/drag-auto-scroll';

// ============================================================================
// Tailwind Classes Utilities
// ============================================================================
export {
  tailwindClasses,
  popularClasses,
  searchTailwindClasses,
  getAllClasses,
} from './tailwind-classes';

export type { TailwindClassGroup } from './tailwind-classes';

// ============================================================================
// Editor Components
// ============================================================================
export { Editor } from './Editor';
export { CompactEditor } from './CompactEditor';
export type { CompactEditorProps } from './CompactEditor';
export { CompactToolbar } from './CompactToolbar';
export type { CompactToolbarProps } from './CompactToolbar';

// ============================================================================
// AI Integration
// ============================================================================
export type {
  AIProvider,
  AIStreamOptions,
  AIConfig,
} from './ai/types';

export { createOpenAIProvider } from './ai/openai-provider';
export type { OpenAIProviderOptions } from './ai/openai-provider';

export { createAnthropicProvider } from './ai/anthropic-provider';
export type { AnthropicProviderOptions } from './ai/anthropic-provider';

export { createGeminiProvider } from './ai/gemini-provider';
export type { GeminiProviderOptions } from './ai/gemini-provider';

export { streamToBlocks, parseInlineMarkdown, hasInlineFormatting } from './ai/stream-to-blocks';

export { useEditorAI } from './hooks/useEditorAI';
export type { UseEditorAIOptions, UseEditorAIReturn } from './hooks/useEditorAI';

export { AICommandMenu } from './AICommandMenu';
export type { AICommandMenuProps } from './AICommandMenu';

// ============================================================================
// Demo Content
// ============================================================================
export { createDemoContent } from './demo-content';
export { createEmptyContent } from './empty-content';

// ============================================================================
// Collaboration (opt-in — requires yjs + y-websocket peer deps)
// ============================================================================
export type {
  CollabOptions,
  CollabState,
  CollabUser,
} from './collaboration/types';
export { REMOTE_ORIGIN } from './collaboration/types';
export type { AwarenessManager } from './collaboration/awareness';
export { createAwarenessManager } from './collaboration/awareness';
export {
  applyOperationToYDoc,
  syncYDocToStore,
  initYDocFromContainer,
} from './collaboration/y-binding';
export { useCollaboration } from './hooks/useCollaboration';
export { CollaborationProvider, useCollaborationState } from './CollaborationProvider';
export type { CollaborationProviderProps } from './CollaborationProvider';
export { RemoteCursor } from './RemoteCursor';
export type { RemoteCursorProps } from './RemoteCursor';

// ============================================================================
// Extension System
// ============================================================================
export {
  Extension, Node, Mark, ExtensionManager, CommandManager, CommandChain, StarterKit,
  // Built-in nodes
  Paragraph, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
  Blockquote, CodeBlock, BulletList, OrderedList,
  HorizontalRule, Image as ImageExtension, Video as VideoExtension, Table as TableExtension, Divider,
  // Built-in marks
  Bold, Italic, Underline, Strikethrough, InlineCode, Link as LinkExtension,
} from './extensions';
export type {
  ExtensionConfig,
  NodeExtensionConfig,
  MarkExtensionConfig,
  ResolvedExtension,
  ResolvedNodeExtension,
  ResolvedMarkExtension,
  AnyResolvedExtension,
  ExtensionContext,
  CommandContext,
  CommandFunction,
  ShortcutHandler,
  InputRule,
  SlashCommand,
  ParseRule,
  AttributeSpec,
  BlockRenderProps,
} from './extensions';
