---
name: "ShahContract + ETH Wallet"
tagline: "Crowd-written branching Shahnameh on Ethereum, plus a multi-sig wallet with guardian recovery."
role: "Solo"
status: "shipped"
team: false
stack: ["Solidity", "Hardhat", "Ethereum", "TypeScript", "ethers"]
links:
  demo: "/demos/shahnameh/"
  credit:
    label: "Idea inspired by Adventureum by anallergytoanalogy; contract rewritten from scratch"
    url: "https://github.com/anallergytoanalogy/blockchain-adventure"
order: 5
featured: false
media:
  - type: image
    src: "projects/shahcontract/1.webp"
    alt: "ShahContract home: an on-chain Shahnameh story hero and reading entry"
  - type: image
    src: "projects/shahcontract/2.webp"
    alt: "ShahContract reader showing a retold episode with reader path choices"
---

## 01 Overview

ShahContract is an on-chain, crowd-written branching story from the Shahnameh, with a wallet-connected dApp. A companion repository holds a smart-contract wallet with multi-signature approval and guardian recovery.

## 02 Architecture

The story contract, ShahnamehStory.sol, was written from scratch with tests first: label and chapter byte limits, two or three branches per chapter, a cooldown, a last-open-branch rule, events and voting. The wallet contract was rewritten with tests for vote clearing, cancellation, allowance spending, rejection of zero, owner and guardian addresses, events and thresholds.

## 03 Key decisions

**One interface, two chains.** The dApp (Vite and TypeScript, no UI framework, English and Persian with RTL) talks to a ChainAdapter. The mock adapter is a TypeScript port of both contracts with localStorage, latency, error injection and a reset button; the live adapter uses an EIP-1193 provider and ethers with addresses from environment variables. Shared scenario tests check the two stay in step.

**Licence hygiene.** Both repositories are MIT. The original Adventureum code was dropped and the story contract replaced.

## 04 Result

Contracts have unit and randomised property tests (Hardhat 3, seeded PRNG), solhint, a Sepolia network entry that reads keys from the environment, and deploy scripts. The demo has Vitest unit tests and Playwright journeys. The Persian story text is a machine-drafted draft.
