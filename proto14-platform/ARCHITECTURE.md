# Proto14 Platform - ディレクトリ構成

## プロジェクト構造

```
proto14-platform/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx            # ホームページ
│   ├── globals.css         # グローバルスタイル
│   ├── bom/                # BOMアップロード機能
│   ├── custom-parts/       # 加工品見積依頼
│   ├── design/             # 設計・試作パートナー選定
│   ├── procurement-list/   # 手配品リスト
│   ├── project-settings/   # プロジェクト設定
│   ├── project-top/        # プロジェクトトップ
│   └── standard-parts/     # 規格品検索
│
├── components/              # 再利用可能なコンポーネント
│   ├── layout/             # レイアウト関連
│   │   └── Header.tsx      # ヘッダーコンポーネント
│   ├── features/           # 機能別コンポーネント
│   ├── ui/                 # UI基本コンポーネント
│   ├── common/             # 共通コンポーネント
│   ├── forms/              # フォームコンポーネント
│   ├── charts/             # グラフコンポーネント
│   └── cards/              # カードコンポーネント
│
├── lib/                     # ライブラリ・ユーティリティ
│   ├── hooks/              # Reactカスタムフック
│   │   └── useLanguage.tsx # 言語切替フック
│   ├── data/               # データ・定数
│   │   ├── mockData.ts    # モックデータ
│   │   └── translations.ts # 翻訳データ
│   ├── types/              # TypeScript型定義
│   │   ├── index.ts        # 共通型定義
│   │   ├── project/        # プロジェクト関連型
│   │   ├── parts/          # 部品関連型
│   │   ├── user/           # ユーザー関連型
│   │   └── api/            # API関連型
│   └── utils/              # ユーティリティ関数
│
├── services/                # API・外部サービス連携
├── api/                     # API Routes (必要に応じて)
├── public/                  # 静的ファイル
│   ├── images/             # 画像ファイル
│   └── documents/          # ドキュメント
│
├── config/                  # 設定ファイル
├── tests/                   # テストファイル
├── docs/                    # ドキュメント
│   └── reference-html/     # 参考HTMLファイル
│
├── .next/                   # Next.jsビルド出力 (gitignore)
├── node_modules/            # 依存パッケージ (gitignore)
├── package.json             # パッケージ定義
├── tsconfig.json           # TypeScript設定
├── tailwind.config.ts      # Tailwind CSS設定
├── next.config.mjs         # Next.js設定
└── README.md               # プロジェクト説明

```

## ディレクトリの役割

### `/app`
Next.js 14のApp Routerを使用。各ディレクトリが自動的にルートになります。

### `/components`
- `layout/`: ヘッダー、フッター、サイドバーなど
- `features/`: 特定機能用のコンポーネント
- `ui/`: ボタン、入力フィールドなど基本UI
- `common/`: 複数箇所で使用される共通コンポーネント
- `forms/`: フォーム関連コンポーネント
- `charts/`: データ可視化コンポーネント
- `cards/`: カード型UIコンポーネント

### `/lib`
- `hooks/`: カスタムReactフック
- `data/`: 定数、モックデータ、翻訳
- `types/`: TypeScript型定義
- `utils/`: ヘルパー関数

### `/services`
外部APIとの通信、ビジネスロジック

### `/public`
静的ファイル（画像、PDFなど）

### `/config`
環境設定、定数設定

### `/tests`
単体テスト、統合テスト

## 開発ガイドライン

1. **コンポーネント作成時**
   - 機能別に適切なディレクトリに配置
   - 再利用可能な設計を心がける

2. **型定義**
   - `/lib/types`配下に機能別に整理
   - インターフェースは明確に定義

3. **スタイリング**
   - Tailwind CSSを優先使用
   - カスタムCSSは最小限に

4. **データフロー**
   - 現在はモックデータ使用
   - 将来的にはservices経由でAPI連携

## 今後の拡張計画

- [ ] API Routes実装
- [ ] データベース連携
- [ ] 認証機能追加
- [ ] テスト環境整備
- [ ] CI/CD設定