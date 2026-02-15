import type { Tables } from "@/types/supabase";

export type CommentNode = Tables<"comments"> & {
  children: CommentNode[];
};

export function buildCommentTree(
  flatComments: Tables<"comments">[],
): CommentNode[] {
  const map = new Map<number, CommentNode>();

  for (const comment of flatComments) {
    map.set(comment.id, { ...comment, children: [] });
  }

  const roots: CommentNode[] = [];

  for (const comment of flatComments) {
    const node = map.get(comment.id);
    if (!node) continue;
    if (comment.parent_id === null) {
      roots.push(node);
    } else {
      const parent = map.get(comment.parent_id);
      if (parent) {
        parent.children.push(node);
      }
    }
  }

  return pruneDeletedLeaves(roots);
}

/**
 * 削除済みかつ子を持たないノードを再帰的に除去する。
 * 削除済みでも子がいれば「このコメントは削除されました」表示のために残す。
 */
function pruneDeletedLeaves(nodes: CommentNode[]): CommentNode[] {
  return nodes.reduce<CommentNode[]>((acc, node) => {
    node.children = pruneDeletedLeaves(node.children);
    if (node.deleted_at !== null && node.children.length === 0) {
      return acc;
    }
    acc.push(node);
    return acc;
  }, []);
}
