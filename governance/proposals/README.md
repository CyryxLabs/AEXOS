# aexos-core/governance/proposals/

FrameworkProposals — formal change requests to evolve the AEXOS framework based on AuditFindings.

See [`../evolution-pipeline.md`](../evolution-pipeline.md) for full pipeline.

## Layout

```text
proposals/
├── README.md                              # this file
├── PROP-<YYYYMMDD>-<slug>.yaml            # active proposals (PENDING / APPROVED / NEEDS_REVISION)
└── archive/                               # rejected or superseded proposals
    └── PROP-<YYYYMMDD>-<slug>.yaml
```

## Status of a proposal

- **PENDING** — awaiting Paulo Petruff's review
- **APPROVED** — Paulo Petruff signed; implementer can open PR in aexos-core
- **REJECTED** — Paulo Petruff declined; proposal moves to `archive/` with rationale
- **NEEDS_REVISION** — Paulo Petruff requested changes; proposer addresses and resubmits

## Authority

Only Paulo Petruff sets `approver_decision` field. Any agent can write a proposal but cannot self-approve.
