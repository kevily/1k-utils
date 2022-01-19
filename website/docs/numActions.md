---
title: numActions
---

## Types

```typescript
function split(num: number, len?: number): string[]
function toPercentage(dividend: number, divisor: number, precision = 2): number
function clipPercentageFromNum(target: number, clipNum: number): string[]
```

## Usage

```typescript
numActions.split(12, 6) // => ['0', '0', '0', '0', '1', '2']
numActions.clipPercentageFromNum(65, 5) // => [20, 20, 20, 5, 0]
numActions.toPercentage(10, 100) // => 10
numActions.toPercentage(10, 0) // => 0
```
