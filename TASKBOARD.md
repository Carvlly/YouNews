# TASKBOARD

Title: YouNews

## 計画

### Phase 1: プロジェクトの初期化 (完了)
- [x] TASKBOARD.mdの作成
- [x] metadata.jsonの更新
- [x] 必要なパッケージのインストール (rss-parser, js-cookie, date-fns, sanitize-html, etc.)
- [x] タイポグラフィとカラーの設定 (app/layout.tsx, globals.css)

### Phase 2: データレイヤーの構築 (完了)
- [x] RSSフェッチ用APIルート (`/api/rss/route.ts`) の実装
- [x] フィードデータの型定義

### Phase 3: UIコンポーネントの実装 (完了)
- [x] ニュースソース選択パネル（モーダル/ドロワー）の実装
- [x] メインレイアウトとヘッダーの実装
- [x] ニュースカラムとカード要素の実装
- [x] ホバーエフェクトとフェードインアニメーションの実装
- [x] スケルトンローカルディングの実装

### Phase 4: 統合と仕上げ (完了)
- [x] ソース選択状態のCookie保存・復元処理
- [x] 最終動作確認
- [x] 表示記事数の最適化とスクロールによる追加読み込み機能の実装
- [x] テーマ切り替えの実装
- [x] モバイル端末向けのレスポンシブデザイン（横スクロールのスナップ、ヘッダーの整理）

### Phase 5: 最適化とリファクタリング (完了)
- [x] SWRによるクライアント側データフェッチの最適化 (`useSWR` の導入と古い `useEffect` + `fetch` の削除、無駄な再フェッチの抑止)
- [x] APIルートでの外部RSSアクセス負荷軽減 (Next.js キャッシュ用 `Cache-Control` ヘッダー `s-maxage=300, stale-while-revalidate=600` の付与)

### Phase 6: メディア拡張 (完了)
- [x] Impress Watch, PC Watch, AV Watch, INTERNET Watch, Publickey のRSSを追加
- [x] 表示をカテゴリ(japan/international)ベースでフィルタリングするように `SourceSelector.tsx` を改修

### Phase 7: Aboutページの作成 (完了)
- [x] /about ページを追加
- [x] 「RSSフィードのみを対象としている事」「開発中であること」を掲載
- [x] ヘッダーにAboutリンクを追加

### Phase 8: メディア拡張2 (完了)
- [x] 毎日新聞、産経新聞、東京新聞、日経クロステック、CNN.co.jp、東洋経済オンライン、ダイヤモンド・オンライン、日経ビジネス のRSSを追加 (Japanカテゴリ)
- [x] 産経新聞、東京新聞、CNN.co.jp、ダイヤモンド・オンラインのRSSを非対応化

### Phase 9: UI改善とカテゴリ分け (完了)
- [x] ニュースサイトにカテゴリ（general, tech, business, developer）を付与
- [x] Settingsダイアログ内の表示をカテゴリごとにグループ化して表示するように修正

### Phase 10: メディア拡張3 (完了)
- [x] CNN.co.jpとQiita (人気) のRSSを追加

### Phase 11: ブランクスレートとロゴの反映 (完了)
- [x] ロゴ画像を `logo.png` (新しくアップロードされた画像) に差し替え
- [x] ヘッダー等のロゴのレイアウトを「レイヤー下（背景的）」な扱いへ変更し `mix-blend-mode` 等を適用
- [x] デザイン指定を修正し、ヘッダー・ブランク画面のロゴをテキスト横や中央配置の通常のアイコン表示へ戻す (blend-modeやopacityを調整)
- [x] ソースが0個の時はメインエリアの中央に透かしロゴと案内文を表示
- [x] 選択をすべて解除したときに、デフォルトソースにフォールバックさせず空のまま保存・表示するよう修正

### Phase 12: クリーンアップ (完了)
- [x] 未使用の依存関係 (`@hookform/resolvers`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@google/genai`) を削除
- [x] 未使用のコード (`lib/utils.ts`, `hooks/use-mobile.ts`) を削除し、空の `hooks` ディレクトリを削除

### Phase 13: バージョン表記の更新 (完了)
- [x] バージョン表記を `v1.0.4` から `v1.1.0` に更新 (`app/page.tsx`, `app/about/page.tsx`)

### Phase 14: SEO最適化とセマンティックタグ改善 (完了)
- [x] メタデータ (OGP / Twitter Cardなど) の充実 (`app/layout.tsx`)
- [x] JSON-LDの追加 (`app/layout.tsx`)
- [x] robots.txt と sitemap.xml の生成 (`app/robots.ts`, `app/sitemap.ts`)
- [x] セマンティックHTML（h1, section, article）への変更 (`app/page.tsx`, `components/NewsColumn.tsx`)

### 既知のバグ
- ~~スクロールできない問題~~ (修正済: GridからFlexレイアウトへ変更し高さを制約)
- ~~RSSによる重複キーのWarning~~ (修正済: keyにindexを付与することで一意性を担保)
- ~~一番下までスクロールしても新しい記事が表示されない~~ (修正済: スクロール検知の閾値を広げ、最後まで到達した際に"End of feed"という文言を表示するように修正)
