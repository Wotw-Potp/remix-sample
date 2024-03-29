# Remix Sample App

:construction: **Work in Progress**

> [!WARNING]
> 構築参考用のサンプルアプリケーションのため、実際のプロジェクトで使用する際は**セキュリティやパフォーマンスなどを考慮して適切な対策を行ってください**

## :pushpin: Overview
`Remix`を使用した Webアプリケーションの開発セットアップ

## :wrench: Tech Stack
### Development
- Docker
- Node.js(Typescript): 開発時のバージョン `21.7.1`
- MySQL

### Frameworks & Libraries
- [Remix](https://remix.run/)
- [Prisma](https://www.prisma.io/)
- [Storybook](https://storybook.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## :rocket: Getting Started
### 1. Setup Docker
0. Docker Desktopをインストールし起動する
1. `.env.sample`をコピーして`.env`を作成し、環境変数を設定する
2. `project/.env.sample`をコピーして`project/.env`を作成する

   > `project/.env`は初期状態では Dockerコンテナの環境変数を採用するようにしているので、必要に応じて設定を変更する

3. Dockerコンテナを起動する
   ```bash
   $ docker-compose up -d
   ```

4. Docker Node.jsコンテナに入る
   ```bash
   $ docker-compose exec remix-sample-node bash
   ```

### 2. Setup Prisma
1. Prismaのスキーマを作成する
   ```bash
   $ npx prisma migrate dev --name init
   ```

2. Prismaのスキーマをデータベースに反映する
   ```bash
   $ npx prisma db push
   ```

### 3. Start Development
> [!TIP]
> 開発時はデバッグやライブラリの追加をしやすくするため、Dockerコンテナ起動時にスクリプトを実行しないようにしている

- 開発用サーバーを起動する
   ```bash
   $ npm run dev
   ```

   > ブラウザで `http://localhost:3000` にアクセスする

- Storybookを起動する
   ```bash
   # [コンテナ内]
   $ npm run storybook
     # or
   # [ホスト側]
   $ sh shells/local/init-storybook.sh
   ```

   > ブラウザで `http://localhost:6006` にアクセスする

- Prisma Studioを起動する
   ```bash
   # [コンテナ内] Prisma Studio用のポート番号を指定する
   $ npx prisma studio -p 1001
     # or
   # [ホスト側]
   $ sh shells/local/init-prisma-studio.sh
   ```

   > ブラウザで `http://localhost:1001` にアクセスする

## :memo: Application Routes

> [!TIP]
> ルーティング仕様については `Remix` のドキュメントを参照のこと

| URL | Route File | Description |
| :--- | :---------- | :----------- |
| `/` | `project/app/routes/_home._index/route.tsx` | トップページ |
| `/signin` | `project/app/routes/_auth.signin/route.tsx` | ログインページ |
| `/signup` | `project/app/routes/_auth.signup/route.tsx` | 新規登録ページ |
| `admin/dashboard` | `project/app/routes/admin.dashboard/route.tsx` | 管理者用ページトップ |
| `admin/users` | `project/app/routes/admin.users/route.tsx` | ユーザー一覧ページ |
| `admin/users/:id` | `project/app/routes/admin.users_.$id/route.tsx` | ユーザー詳細ページ |
| `admin/settings` | `project/app/routes/admin.settings/route.tsx` | アカウント情報設定ページ |
| `admin/posts` | `project/app/routes/admin.posts/route.tsx` | 投稿一覧ページ |
| `admin/posts/:slug` | `project/app/routes/admin.posts_.$slug/route.tsx` | 投稿詳細ページ |
| `admin/posts/new` | `project/app/routes/admin.posts_.new/route.tsx` | 新規投稿ページ |
| `admin/talks` | `project/app/routes/admin.talks/route.tsx` | トークルーム一覧ページ |
| `admin/talks/:roomId` | `project/app/routes/admin.talks_.$roomId/route.tsx` | トークルーム詳細ページ |
