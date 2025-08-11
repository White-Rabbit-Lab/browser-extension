---
title: Use Custom tRPC v11 Implementation for Type-Safe Extension Messaging
status: Accepted
updated: 2025-08-11
---

## Context

WXTブラウザ拡張機能では、異なる実行コンテキスト（background script、content scripts、popup、options page）間で型安全なメッセージングが必要です。ネイティブのChrome messaging API（`chrome.runtime.sendMessage`、`chrome.tabs.sendMessage`）は型安全性が欠如しており、ランタイムエラーや開発体験の低下につながっています。

@docs/architecture/rfc/2025-08-11-type-safe-messaging-patterns.md での調査により、以下の選択肢を比較検討しました：

1. @webext-core/messaging - 軽量で優れたTypeScriptサポート
2. trpc-chrome - tRPC v10のみサポート、メンテナンスが停滞
3. trpc-browser - tRPC v10のみサポート、比較的アクティブなメンテナンス
4. カスタムtRPC v11実装 - 最新機能と最小バンドルサイズの両立

現在利用可能なtRPCベースのソリューション（trpc-chrome、trpc-browser）はいずれもtRPC v10のみをサポートしており、v11への移行パスが不明確です。また、これらのライブラリはバンドルサイズが30-40KBと比較的大きくなっています。

## Decision

**カスタムtRPC v11実装を採用します。** webext-core/messagingの軽量なアーキテクチャパターンを参考にしながら、tRPC v11の最新機能とZodによる完全な型安全性を実現する独自実装を開発します。

実装アプローチ：

1. **コアメッセージングレイヤー（~2KB）**
   - webext-coreのパターンを参考にした最小限の汎用メッセージング基盤
   - メッセージIDの生成とルーティング
   - エラーのシリアライズ/デシリアライズ
   - 単一リスナーパターンによる効率的な実装

2. **tRPC v11統合レイヤー（~3KB）**
   - tRPC v11のサーバー/クライアント設定
   - カスタムリンク実装
   - 型推論の保持
   - Zodスキーマ統合（~3-5KB）

3. **拡張機能固有の機能**
   - タブメッセージングサポート
   - コンテキスト保持
   - サブスクリプション処理
   - ホットモジュールリプレースメント互換性

実装は `lib/messaging/` ディレクトリに配置し、将来的なライブラリ化を見据えた疎結合な設計とします。

### アーキテクチャと責務分担

各ライブラリとモジュールの責務を明確に分離：

**外部依存関係の責務：**

- **@trpc/server**: サーバー側（バックグラウンドスクリプト）のRPC処理、ルーター定義、プロシージャー実行
- **@trpc/client**: クライアント側（ポップアップ、コンテンツスクリプト）のRPC呼び出し、プロキシクライアント作成
- **zod**: 入出力のスキーマ定義、実行時の型検証、TypeScript型の自動推論

**lib/messagingの責務：**

- **core.ts**: 汎用メッセージングシステム、単一ルートリスナーパターンの実装
- **trpc.ts**: tRPCとブラウザメッセージングの統合、カスタムリンク実装、Observable パターンによる非同期処理
- **adapters/**: フレームワーク固有のブラウザAPI実装（WXT、Chrome、webextension-polyfill対応）

この設計により、各モジュールが単一責任原則に従い、テスト可能性と保守性が向上します。

## Consequences

### ポジティブな影響

- **最新技術スタック**: tRPC v11の最新機能と最適化を活用可能
- **最小バンドルサイズ**: 10KB未満の実装（既存ソリューションの1/3～1/4）
- **完全な型安全性**: TypeScriptの型推論とZodによるランタイム検証
- **Tree-shakeable**: モジュラーアーキテクチャによる最適化
- **完全なコントロール**: 実装の詳細を完全に制御可能
- **将来的な拡張性**: ライブラリ化や他プロジェクトへの展開が容易
- **tRPC v11+への追従**: 外部ライブラリの更新を待つ必要なし

### ネガティブな影響

- **初期開発工数**: 2-3日の開発期間が必要
- **メンテナンス責任**: 独自実装のメンテナンスとテストが必要
- **コミュニティサポートの欠如**: 既存ライブラリと比較してコミュニティサポートが得られない
- **潜在的なバグリスク**: カスタム実装における未知のバグの可能性

## Alternatives

### Option 1: @webext-core/messaging

- **メリット**: 極めて軽量（<5KB）、WXTエコシステムとのネイティブ統合
- **却下理由**: tRPCの高度な機能（ミドルウェア、バッチング、サブスクリプション）が利用できない。プロジェクトの将来的な要件を考慮すると、より柔軟性の高いソリューションが必要

### Option 2: trpc-browser

- **メリット**: 既存のtRPCパターンとの親和性、アクティブなメンテナンス
- **却下理由**: tRPC v10のみサポート、バンドルサイズが大きい（30-40KB）、v11への移行パスが不明確

### Option 3: trpc-chrome

- **メリット**: 成熟した実装、安定性
- **却下理由**: 2年以上更新されておらず、tRPC v10のみサポート、メンテナンスリスクが高い

## References

- Related RFC: @docs/architecture/rfc/2025-08-11-type-safe-messaging-patterns.md
- webext-core messaging implementation: https://github.com/aklinker1/webext-core
- trpc-browser GitHub: https://github.com/janek26/trpc-browser
- tRPC v11 documentation: https://trpc.io/docs/v11
- Chrome Extension Messaging API: https://developer.chrome.com/docs/extensions/develop/concepts/messaging
