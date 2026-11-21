# news-image-20261121 — The World in One Image

A newspaper front page for Saturday 21 November 2026, drawn as a single 1024x1024 image. Built for the make.fun news-image-20261121 bounty, paid in USDC.

[![news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/Whydiriki700/news-image-20261121/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/Whydiriki700/news-image-20261121/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

## What is on the page

This commit is the frame entry: it carries the kit starter image so the entry is locked in early on the morning of 21 November 2026. The final poster, built from the full day's world news of Saturday 21 November 2026, replaces it the next morning before the deadline, in the established pattern of this series: one lead story, five to six panels below it, and a bottom strip carrying the rest of the day.

## How it was built

The page is typeset in HTML with real text and rendered to PNG, so every headline stays sharp at small sizes. `main.ts` is the entrypoint: it checks `entry.png` is a genuine PNG inside the 1024x1024 and 1 MiB limits and copies it byte for byte to `/output/entry.png`.

Run it locally:

```
MAKEFUN_OUTPUT_DIR=out node main.ts
```

## The bounty

[news-image-20261121 on make.fun](https://make.fun/bounty/news-image-20261121) — real bounties, real USDC. New here? Join through https://make.fun/r/vwpycztt

## License

MIT — see `LICENSE`.
