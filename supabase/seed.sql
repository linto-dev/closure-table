-- サンプル記事
INSERT INTO articles (id, title, body) OVERRIDING SYSTEM VALUE VALUES
  (1, '閉包テーブルを学ぼう', 'この記事では閉包テーブルの仕組みを解説します。');

-- =============================================================
-- コメントツリー構造（19件）
--
--  1 太郎「閉包テーブルの解説ありがとうございます！…」
--  ├─ 2 花子「同意です！特にサブツリーの取得が…」
--  │  └─ 4 太郎「そうですよね。隣接リストだと…」
--  │     └─ 8 美咲「再帰CTEはパフォーマンスも…」
--  │        └─ 13 太郎「大規模データだと特に…」
--  └─ 3 次郎 [削除済み]
--     ├─ 5 健太「確かに、挿入時のコストや…」
--     │  └─ 9 花子「N個のノードがある場合…」
--     │     └─ 14 健太「実際の運用ではそこまで…」
--     └─ 6 美咲「私もデメリットの解説が…」
--
--  7 花子「質問です。閉包テーブルと…」
--  ├─ 10 次郎「個人的には閉包テーブルの…」
--  │  └─ 15 花子「なるほど、確かにネストセットの…」
--  │     └─ 17 次郎「はい、ノードを移動するときも…」
--  │        └─ 19 美咲「そう考えると閉包テーブルは…」
--  └─ 11 太郎 [削除済み]
--     └─ 16 健太「なるほど、トレードオフが…」
--
--  12 美咲「この記事をきっかけにツリー構造の…」
--  └─ 18 太郎「いいですね！他にも…」
-- =============================================================

-- スレッド 1: 閉包テーブルの感想・議論
INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (1, 1, NULL, '太郎', '閉包テーブルの解説ありがとうございます！隣接リストとの違いがよくわかりました。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (2, 1, 1, '花子', '同意です！特にサブツリーの取得が一発のクエリでできるのが魅力的ですね。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (3, 1, 1, '次郎', '閉包テーブルのデメリットについても触れてほしいです。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (4, 1, 2, '太郎', 'そうですよね。隣接リストだと再帰CTEが必要になりますもんね。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (5, 1, 3, '健太', '確かに、挿入時のコストやストレージの増加についても知りたいです。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (6, 1, 3, '美咲', '私もデメリットの解説があると嬉しいです。');

-- スレッド 2: 他のツリーモデルとの比較
INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (7, 1, NULL, '花子', '質問です。閉包テーブルとネストセットモデルはどちらが使いやすいですか？');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (8, 1, 4, '美咲', '再帰CTEはパフォーマンスも心配ですし、閉包テーブルのほうが安心感ありますね。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (9, 1, 5, '花子', 'N個のノードがある場合、最悪でO(N²)のパスが必要になりますよね。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (10, 1, 7, '次郎', '個人的には閉包テーブルのほうが直感的だと思います。ネストセットは左右の値の管理が複雑です。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (11, 1, 7, '太郎', '用途によりますが、読み取りが多いならネストセット、更新が多いなら閉包テーブルが良いと思います。');

-- スレッド 3: ツリー構造全般への興味
INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (12, 1, NULL, '美咲', 'この記事をきっかけにツリー構造のデータベース設計に興味を持ちました。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (13, 1, 8, '太郎', '大規模データだと特に差が出そうですね。ベンチマーク取ってみたいです。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (14, 1, 9, '健太', '実際の運用ではそこまで深くならないので、問題になることは少ないと聞きました。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (15, 1, 10, '花子', 'なるほど、確かにネストセットのlft/rgt値は挿入時に全体の再計算が大変そうですね。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (16, 1, 11, '健太', 'なるほど、トレードオフがあるんですね。勉強になります。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (17, 1, 15, '次郎', 'はい、ノードを移動するときも大量のUPDATEが必要になります。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (18, 1, 12, '太郎', 'いいですね！他にもマテリアライズドパスという方法もありますよ。');

INSERT INTO comments (id, article_id, parent_id, author_name, body) OVERRIDING SYSTEM VALUE VALUES
  (19, 1, 17, '美咲', 'そう考えると閉包テーブルは移動もパスの差し替えだけで済むんですね。');

-- 削除済みコメント（子を持つソフトデリート）
-- コメント 3: 次郎の提案 → 子(5, 6)があるので「削除されました」表示
-- コメント 11: 太郎の比較意見 → 子(16)があるので「削除されました」表示
UPDATE comments SET deleted_at = now() WHERE id IN (3, 11);

-- シーケンスをシードデータの最大値にリセット
SELECT setval(pg_get_serial_sequence('articles', 'id'), (SELECT MAX(id) FROM articles));
SELECT setval(pg_get_serial_sequence('comments', 'id'), (SELECT MAX(id) FROM comments));
