# Project Instructions

## Agent Engineering Guidelines

This project should prioritize maintainability, simplicity, and clear domain boundaries.

The code should follow principles inspired by:

- A Philosophy of Software Design
- Refactoring
- Learning Domain-Driven Design

## Core Principles

1. Prefer simple, boring, maintainable code.
   - Do not over-engineer.
   - Do not introduce microservices, CQRS, event sourcing, plugin systems, or speculative abstractions unless explicitly requested.
   - Prefer a modular monolith.
2. Organize code around domain concepts.
   - Use business/domain language in modules, types, functions, and tests.
   - Avoid vague names like `utils`, `helpers`, `manager`, `processor`, or `common` unless the meaning is genuinely clear.
3. Prefer deep modules over shallow modules.
   - A good module has a simple interface and hides meaningful complexity.
   - Do not split code into many tiny files unless it improves clarity.
4. Keep boundaries clear.
   - Do not mix UI rendering, request parsing, validation, business logic, database access, and external API calls in the same place.
   - Route handlers/controllers should be thin.
   - Core business logic should live in application/domain modules.
5. Keep business rules centralized.
   - Do not duplicate domain rules across UI, routes, and database code.
   - Frontend validation is for user experience only; server-side validation is required.
6. Refactor safely while changing code.
   - Make small, behavior-preserving refactors when needed.
   - Do not do large rewrites unless explicitly asked.
   - Leave nearby code easier to understand than before.
7. Avoid premature abstraction.
   - Abstract only when there is a real repeated use case or the abstraction clearly simplifies callers.
   - Duplication is better than the wrong abstraction.
8. Use explicit state models.
   - Prefer clear status fields over multiple unclear booleans.
   - Make lifecycle transitions easy to find and test.
9. Isolate external integrations.
   - Wrap providers such as payment, SMS, email, AI, maps, or storage behind simple project-level interfaces.
   - Do not scatter provider-specific calls throughout the codebase.
10. Test important behavior.
   - Prioritize tests for domain rules, use cases, validation, state transitions, and error handling.
   - Avoid brittle tests that only check implementation details.
11. Protect security and privacy.
   - Validate input server-side.
   - Do not log sensitive user data unnecessarily.
   - Never hardcode secrets.
   - Protect admin-only actions.

## Before Coding

For each task, briefly identify:

- Which domain concept is being changed
- Where the logic should live
- Whether an existing module should be reused
- Whether a new abstraction is truly necessary

## Default Decision Rule

When uncertain, choose the simplest design that preserves clear boundaries.

## Pattern Usage Policy

Do not use design patterns proactively.

Use a design pattern only when it solves an actual problem in the current code.

Allowed patterns when justified:

- Adapter: isolate external services or SDKs.
- Strategy: support multiple real business rules with the same interface.
- Factory: centralize complex provider/object creation.
- Repository: isolate important database access.
- Application Service / Use Case: coordinate a user/system action.
- Domain Service: implement domain logic that does not naturally belong to one entity.

Avoid:

- Abstract factories without multiple provider families.
- Inheritance-heavy designs.
- Generic managers/processors.
- Premature plugin systems.
- Architecture that makes simple changes require editing many files.

When using a pattern, add a short comment or note explaining why it is needed.

## UI Work

For any UI, UX, visual design, responsive layout, accessibility, animation, design-system, or frontend polish work, use the installed Codex skill `ui-ux-pro-max`.

Before major UI changes, read and follow:

`/Users/carson/.codex/skills/ui-ux-pro-max/SKILL.md`

For major page redesigns, new screens, design-system work, or visual direction changes, start with the skill's design-system workflow:

```bash
python3 /Users/carson/.codex/skills/ui-ux-pro-max/scripts/search.py "<product type> <industry> <style keywords>" --design-system -p "Facial"
```

Use supplemental searches only when they are relevant to the task:

```bash
python3 /Users/carson/.codex/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain ux
python3 /Users/carson/.codex/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain style
python3 /Users/carson/.codex/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain color
python3 /Users/carson/.codex/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain typography
python3 /Users/carson/.codex/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <project-stack>
```

For small UI fixes, do not run the full workflow unless it would materially improve the result.

Before delivery, check:

- mobile responsiveness
- no horizontal mobile scroll
- accessible color contrast
- readable typography
- touch target quality
- loading, empty, and error states where relevant
- reduced-motion friendliness for animations
- performance impact

Skip this skill only for entirely non-visual work, such as backend-only logic, database changes, infrastructure, or scripts with no user-facing UI impact.
