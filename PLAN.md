# PLAN.md

## プロジェクト概要
パーソナルマルチニューススペース「YouNews」の開発。
ユーザーが選択したニュースサイトのRSSフィードを集約・表示するWebアプリケーション。

## 技術スタック
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Data Fetching: Next.js API Routes (Server-side RSS Fetching to avoid CORS)
- State Management: React useState / useEffect + Cookie (js-cookie)
- Feed Parsing: rss-parser
- Utilities: date-fns (relative time), sanitize-html (stripping HTML tags from description)
- Animation: motion

## 進行フェーズ
1. プロジェクトの初期設定（メタデータ設定、必要なパッケージのインストール、フォントのセットアップ）
2. バックエンドAPIの構築（RSSフィード取得・パース用APIルートの実装）
3. UI基盤の実装（レイアウト、ヘッダー、ニュースソース管理用モーダル）
4. メインコンテンツの実装（ニュースカラム、記事カード、スケルトンローディング、アニメーション）
5. 仕上げとテスト
