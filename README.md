# TODO App Collection

様々な技術スタックで実装したTODOアプリケーション集です。

## このリポジトリについて

このプロジェクトは「Claude CodeによるAI駆動開発入門」Chapter2の学習コードです。
同じTODOアプリを3つの異なるアプローチで実装しています。

## プロジェクト一覧

### 1. SimpleToDo - Vanilla JavaScript版

シンプルなHTML/CSS/JavaScriptのみで実装したバージョン。

**技術スタック:**

- HTML5
- CSS3（グラデーション、トランジション）
- Vanilla JavaScript (ES6+)
- localStorage API

**特徴:**

- 依存関係ゼロ
- クラスベースのJavaScript
- レスポンシブデザイン

**起動方法:**

```bash
# ブラウザで直接開く
open SimpleToDo/index.html
```

### 2. CLI-ToDo - Node.js CLI版

コマンドラインで動作するインタラクティブなバージョン。

**技術スタック:**

- Node.js
- readline モジュール
- JSON ファイルストレージ

**起動方法:**

```bash
cd CLI-ToDo
node index.js
```

### 3. todo-next - Next.js版

モダンなフレームワークで実装したバージョン。

**技術スタック:**

- Next.js 16.1.1 (App Router)
- TypeScript
- Tailwind CSS
- React Hooks (useState, useEffect)

**特徴:**

- 型安全な開発
- Tailwind CSSによる美しいUI
- レスポンシブデザイン
- localStorage での永続化

**起動方法:**

```bash
cd todo-next
npm install  # 初回のみ
npm run dev
```

開発サーバーが起動したら <http://localhost:3000> にアクセス

## 共通機能

すべてのバージョンで以下の機能を実装しています：

- TODOの追加、完了、削除
- フィルター機能（全て/未完了/完了済み）
- 完了済みTODOの一括削除
- データの永続化

## ファイル構成

```text
learn_clode_code3/
├── SimpleToDo/         # Vanilla JavaScript版
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── CLI-ToDo/           # Node.js CLI版
│   ├── index.js
│   └── package.json
├── todo-next/          # Next.js版
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 参考書籍

Claude CodeによるAI駆動開発入門

本プロジェクトは上記書籍のChapter2で作成したサンプルコードです。

Amazon: <https://amzn.asia/d/9gAhgc0>
