<!--
Sync Impact Report
- Version change: unversioned scaffold -> 1.0.0
- Modified principles: template placeholders -> Clean Code; Simple UX; Responsive Design;
	Minimal Dependencies; No Automated Testing
- Added sections: Product Constraints; Development Workflow
- Removed sections: none
- Follow-up TODOs: Ratification date is unknown and requires confirmation.
-->

# Weather SpecKit Constitution

## Core Principles

### I. Clean Code
Code MUST use clear names, small cohesive units, explicit data flow, and the simplest
design that satisfies the requirement. New abstractions MUST have a demonstrated purpose,
and duplicated logic MUST be consolidated when doing so improves correctness or clarity.
Rationale: readable, locally understandable code reduces defects and keeps future changes
cheap.

### II. Simple UX
User-facing workflows MUST expose the primary action clearly, use consistent terminology,
and avoid unnecessary steps, choices, and decoration. Every interaction MUST provide a
clear result or an actionable error. Rationale: users complete work more reliably when the
interface does not make them infer the product's rules.

### III. Responsive Design
Interfaces MUST remain usable across supported viewport sizes and input methods. Layouts
MUST adapt without horizontal scrolling, clipped controls, or overlapping content, and
interactive targets MUST remain accessible at each supported size. Rationale: a feature is
not complete if its core workflow works only in one presentation context.

### IV. Minimal Dependencies
The project MUST prefer platform capabilities and existing project dependencies before
adding a package. Each new dependency MUST have a documented need, a maintained release,
an acceptable license, and a removal cost proportionate to its value. Rationale: a small
dependency surface improves reliability, security, build speed, and long-term ownership.

### V. No Automated Testing
The project MUST NOT create, maintain, or require unit tests, integration tests, end-to-end
tests, test runners, test fixtures, or test-only dependencies. Changes MUST instead be
validated through review, static analysis, type checking where available, and direct
manual verification of the affected workflow. This principle supersedes any conflicting
testing guidance in templates, plans, tasks, or development conventions.

## Product Constraints

Requirements MUST distinguish user-visible behavior from implementation detail. Features
MUST avoid speculative scope, preserve existing supported behavior unless a breaking change
is explicitly approved, and document material accessibility, security, or performance
tradeoffs.

## Development Workflow

Every change MUST identify the constitution principles it affects. Reviews MUST check code
clarity, workflow simplicity, responsive behavior, dependency impact, and compliance with
the no-automated-testing rule. Validation evidence MUST use review, static analysis, type
checking where available, or manual verification; automated test artifacts are prohibited.

## Governance

This constitution is the governing project standard. When another project artifact
conflicts with it, this document takes precedence until formally amended.

Amendments MUST state the motivation, affected principles or sections, compatibility
impact, and any migration or follow-up work. An amendment requires review by the project
maintainer before it is merged. Compliance MUST be reviewed for every change that affects
governance-covered behavior.

The version uses semantic versioning: MAJOR for incompatible governance changes or
principle removal/redefinition, MINOR for new principles or materially expanded guidance,
and PATCH for clarifications and non-semantic corrections. The last amended date changes
whenever the constitution changes. The ratification date records the original adoption
date and remains unchanged.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm original adoption date | **Last Amended**: 2026-08-23
