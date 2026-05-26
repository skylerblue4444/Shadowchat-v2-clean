# Kill Switches and Secret Handling Standard

This project uses a safety-first standard for production hardening. Feature modules that touch money movement, wallet actions, payment providers, automated trading, AI automation, marketplace settlement, or infrastructure mutation should be wired behind explicit kill switches and environment-based allow lists.

## Required kill-switch environment variables

| Variable | Default | Purpose |
|---|---:|---|
| `GLOBAL_PLATFORM_KILL_SWITCH` | `false` | Disables all high-risk platform actions when set to `true`. |
| `PAYMENTS_KILL_SWITCH` | `true` | Blocks live payment, payout, escrow, and checkout execution until explicitly enabled. |
| `WALLET_ACTIONS_KILL_SWITCH` | `true` | Blocks live wallet signing, transfer, staking, minting, or burn execution. |
| `TRADING_KILL_SWITCH` | `true` | Blocks live trade placement and automated market actions. |
| `AI_AUTOMATION_KILL_SWITCH` | `true` | Blocks autonomous write, deploy, purchase, post, or infrastructure-changing AI actions. |
| `MARKETPLACE_SETTLEMENT_KILL_SWITCH` | `true` | Blocks supplier ordering, escrow release, refunds, and settlement actions. |

## Implementation rule

Code should treat missing values as the safest state. For example, payment and wallet actions should be disabled unless the deployment explicitly sets an allow variable and passes role, audit-log, and confirmation checks.

## Secret handling rule

Production credentials, wallet secrets, seed phrases, API tokens, private keys, database URLs, and auth signing secrets must not be committed. Use `.env.example` only for placeholders, and use provider secret stores for live deployments.

## Audit logging rule

Every disabled action should log a safe, non-secret event containing the feature name, actor ID if available, request ID, and reason for blocking. Logs must never include private keys, access tokens, card data, seed phrases, or full authorization headers.
