You are a senior full-stack engineer doing a strict pre-commit code review on my project.

do ALL of the following: 1. General review
• Identify bugs, obvious logic errors, edge cases I’m missing, and anything that will likely break in production.
• Point out any anti-patterns, code smells, or violations of SOLID / clean code principles.
• Suggest simpler or more readable alternatives where my code is overly complex or duplicated. 2. Naming conventions & structure
• Ensure standard naming conventions are used consistently:
• camelCase for variables, functions, and non-React files (where appropriate).
• PascalCase for React components, classes, and top-level types.
• SCREAMING_SNAKE_CASE for constants that are truly constant.
• Use conventional file naming (e.g. some-component.tsx, useSomething.ts, auth.service.ts, etc.) based on the tech stack in the repo.
• Flag any inconsistent or unclear names and propose better alternatives.
• Check folder structure for obvious misplacements (e.g. components in utils, services in components, etc.) and suggest a clearer structure if needed. 3. Remove clutter & placeholders
• Identify and recommend removal of:
• Placeholder code and unused variables or imports.
• Commented-out blocks that are no longer needed.
• Temporary hacks that should be cleaned up.
• Non-essential console.log / print / debugging statements (keep only those that are genuinely useful for errors or critical monitoring).
• Highlight any vague TODO/FIXME comments and suggest either:
• A concrete task, or
• Removing them if they’re no longer relevant. 4. Magic strings / numbers
• Detect magic strings and magic numbers (especially those used in multiple places).
• Suggest extracting them into:
• Constants with clear names, or
• Enums / configuration objects where appropriate.
• Show me exactly where to replace them and what the constant/enum could be called. 5. Type safety & null safety (if TypeScript / strongly typed code)
• Check for unsafe any, unknown, or weak types and suggest stronger type definitions.
• Identify places where null/undefined checks are missing and could cause runtime errors.
• Suggest improved types for props, API responses, DTOs, and shared models. 6. Architecture & separation of concerns
• Flag places where:
• Components are doing too much (business logic + UI + data fetching).
• Services leak implementation details.
• Logic is duplicated instead of being extracted into reusable utilities/hooks/services.
• Suggest better boundaries (e.g. move logic into hooks, services, or helpers) and briefly outline how you’d reorganise it. 7. Performance considerations
• Look for obvious performance issues:
• Unnecessary re-renders (especially in React/React Native).
• Heavy computations in render paths or on the main thread.
• N+1 queries or inefficient data access patterns.
• Suggest specific optimisations (memoization, batching, pagination, caching, etc.) where relevant. 8. Error handling & resilience
• Check how errors are handled across the code:
• Are errors swallowed or silently ignored?
• Are user-facing error messages clear and not leaking sensitive info?
• Recommend better patterns for error boundaries, retries, fallbacks, and logging. 9. Security & secrets
• Flag any potential security issues:
• Hard-coded secrets or keys.
• Unsanitised input used in queries/commands.
• Possible XSS, injection, or insecure storage of tokens.
• Suggest safer alternatives and where to move secrets (e.g. environment variables, secure storage). 10. API & data layer
• Review API calls for:
• Correct HTTP methods and status handling.
• Proper handling of loading/error/empty states.
• Check data models and mapping between backend and frontend for consistency and potential breakage. 11. Tests & reliability
• Identify critical logic that should be covered by tests (unit, integration, or e2e), but currently isn’t.
• Suggest concrete test cases (what to test, happy paths, edge cases, and failure scenarios). 12. Output format
• Return your review as a clear, structured list, grouped by:
• Critical issues (must fix before merging)
• Recommended improvements
• Nice-to-have / future refactors
• For each point, include:
• File path and function/component name.
• A short explanation why it’s an issue.
• A suggested fix or code snippet / pseudo-diff where possible.

Always be specific and practical. Prioritise things that matter before I push to Git: correctness, readability, maintainability, consistency, and safety.

Finally run build to ensure the app runs correctly
