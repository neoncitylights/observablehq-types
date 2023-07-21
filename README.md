# types-ohq-d3
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub deployments](https://img.shields.io/github/deployments/wandering-app/types-ohq-d3/github-pages?label=deploy&style=flat-square)](https://github.com/wandering-app/types-ohq-d3/deployments/activity_log?environment=github-pages)
[![Node.js workflow](https://img.shields.io/github/actions/workflow/status/wandering-app/types-ohq-d3/main.yml?style=flat-square&logo=github&logoColor=white&label=Node.js%20CI)]((https://github.com/wandering-app/types-ohq-d3/actions/workflows/main.yml))

A library which currently provides experimental TypeScript support for some ObservableHQ and D3 libraries.

## Support roadmap
The **Status** column represents:
 - ✅ (`U+2705 White Heavy Check Mark`): Stable support
 - ⚠️ (`U+26A0 Warning Sign`): Experimental support
 - 🛠️ (`U+1F6E0 Hammer and Wrench`): Not started yet, to-do

### Observable libraries

| Library | `.d.ts` file | Status | Issue |
| ------- | ------------ | ------ | ----- |
| [@observablehq/inspector](https://www.npmjs.com/package/@observablehq/inspector)           | [`inspector.d.ts`](./packages/observablehq_inspector/inspector.d.ts) | ⚠️ | |
| [@observablehq/runtime](https://www.npmjs.com/package/@observablehq/runtime)               | [`runtime.d.ts`](./packages/observablehq_runtime/runtime.d.ts)     | ⚠️ | |
| [@observablehq/stdlib](https://www.npmjs.com/package/@observablehq/stdlib)                 | [`stdlib.d.ts`](./packages/observablehq_stdlib/stdlib.d.ts)       | ⚠️ | |
| [@observablehq/graphviz](https://www.npmjs.com/package/@observablehq/graphviz)             | N/A | 🛠️ | [#30](https://github.com/wandering-app/types-ohq-d3/issues/30) |
| [@observablehq/database-proxy](https://www.npmjs.com/package/@observablehq/database-proxy) | N/A | 🛠️ | [#29](https://github.com/wandering-app/types-ohq-d3/issues/29) |
| [@observablehq/htl](https://www.npmjs.com/package/@observablehq/htl)                       | N/A | 🛠️ | [#31](https://github.com/wandering-app/types-ohq-d3/issues/31) |
| [@observablehq/inputs](https://www.npmjs.com/package/@observablehq/inputs)                 | N/A | 🛠️ | [#32](https://github.com/wandering-app/types-ohq-d3/issues/32) |
| [@observablehq/vega](https://www.npmjs.com/package/@observablehq/vega)                     | N/A | 🛠️ | [#33](https://github.com/wandering-app/types-ohq-d3/issues/33) |

### D3 libraries
| Library | `.d.ts` file | Status | Issue |
| ------- | ------------ | ------ | ----- |
| [d3-geo-polygon](https://www.npmjs.com/package/d3-geo-polygon)       | N/A | ⚠️ | [#22](https://github.com/wandering-app/types-ohq-d3/issues/22) |
| [d3-geo-projection](https://www.npmjs.com/package/d3-geo-projection) | N/A | ⚠️ | [#23](https://github.com/wandering-app/types-ohq-d3/issues/23) |
| [d3-cam16](https://www.npmjs.com/package/d3-cam16)                   | N/A | ⚠️ | [#24](https://github.com/wandering-app/types-ohq-d3/issues/24) |
| [d3-tile](https://www.npmjs.com/package/d3-tile)                     | N/A | 🛠️ | [#26](https://github.com/wandering-app/types-ohq-d3/issues/26) |
| [d3-hcg](https://www.npmjs.com/package/d3-hcg)                       | N/A | 🛠️ | [#27](https://github.com/wandering-app/types-ohq-d3/issues/27) |

## License
This library is licensed under the MIT license ([`LICENSE-MIT`](./LICENSE) or http://opensource.org/licenses/MIT).

### Contribution
Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the MIT license, shall be licensed as above, without any additional terms or conditions.
