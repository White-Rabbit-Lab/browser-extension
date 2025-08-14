<!--
LLM Instructions for Creating Research Document from This Template:

1. FILE CREATION
   - Create new file at: `docs/architecture/researches/{YYYY-MM-DD}-{topic-slug}.md`
   - Format: YYYY-MM-DD = (date +%Y-%m-%d), topic-slug = lowercase-hyphenated-topic
   - Example: `docs/architecture/researches/2024-12-01-ipc-type-safety.md`

2. TEMPLATE USAGE
   - Copy entire template content EXCEPT this instruction block
   - Replace all placeholder values marked with {braces}
   - Complete all sections with thorough research findings
   - Remove any unused optional sections

3. RESEARCH PROCESS
   - Use multiple information sources with tools (WebSearch, Context7, DeepWiki, GitHub)
   - Compare at least 3 alternatives when possible
   - Include recent information (check publication dates)
   - Provide code examples for each pattern
   - Create comparison matrices for systematic evaluation
   - For Required Knowledge section, use appropriate categories such as:
     Core Technologies, Programming Languages, Frameworks & Libraries,
     Tools & Development Environment, Concepts & Patterns, APIs & Services

   Research Methodology Guidelines:
   a. Information Gathering Process:
      - Use Context7 MCP for latest library documentation
      - Use DeepWiki MCP for repository structure analysis
      - Use WebSearch for current best practices and tutorials
      - Use npm view for package metadata and statistics
      - Check GitHub issues for known problems and community solutions

   b. Evaluation Criteria (apply consistently to all options):
      - Technical Fit (30%): How well it solves the specific problem
      - Performance (25%): Bundle size, runtime performance, benchmarks
      - Developer Experience (20%): Learning curve, documentation quality, API design
      - Maintenance (15%): Update frequency, community size, issue resolution time
      - Security (10%): Known vulnerabilities, security track record

   c. Documentation Requirements:
      - Record all sources consulted in Appendix
      - Include specific queries and commands used
      - Note any limitations or gaps in available information

4. CONTENT GUIDELINES
   - Title: Clear description of the research topic
   - Status: Must be one of: In Progress, Completed, Archived
   - Executive Summary: 2-3 sentence overview of findings (neutral, no recommendations)
   - Problem Statement: Clear definition of the technical challenge
   - Evaluation: Use consistent criteria across all options
   - Include both pros and cons for each option
   - Present findings objectively without bias
   - Avoid making final recommendations or "best choice" statements
   - When to use: Describe specific scenarios, conditions, or requirements when this pattern/option should
  be chosen, such as:
    - Technical requirements (real-time updates, data complexity, etc)
    - Performance constraints (latency, memory, throughput, etc)
    - Architecture considerations (microservices, legacy integration, etc)
    - Team/project context (timeline, expertise, maintenance, etc)
   - Best Practices: Provide actionable recommendations for optimal implementation, such as:
    - Configuration guidelines (recommended settings, parameters, etc)
    - Common pitfalls to avoid (anti-patterns, performance traps, etc)
    - Security considerations (authentication, data validation, etc)
    - Testing strategies (unit tests, integration tests, mocking, etc)
    - Error handling patterns (retry logic, fallback behavior, etc)
    - Performance optimizations (caching, lazy loading, batching, etc)

5. LANGUAGE & FORMATTING
   - Write ALL content in English
   - Use "@" notation for internal repository references
   - Use standard URLs for external references
   - Include mermaid diagrams where helpful
     - For sequenceDiagram: Use "Note" syntax to add explanatory context (e.g., Note over, Note right of)
     - For sequenceDiagram: Use "box" syntax to group related components logically
     - Make diagrams self-explanatory with descriptive labels and notes
   - Format code examples with proper syntax highlighting
   - Wrap all library names in backticks
   - Prefer bullet lists over tables for better readability
   - Follow architecture writing guidelines: @docs/guides/architecture-writing-guide.md

6. IMPORTANT
   - Remove this entire instruction comment block from the new file
   - Ensure all research is current (check dates)
   - Include version numbers for libraries/frameworks
   - Document search queries used for transparency
   - Save work frequently if research is extensive
-->

---

title: {Research topic or question}
status: {In Progress | Completed | Archived}
updated: {YYYY-MM-DD}

---

## Executive Summary

{2-3 sentence overview of the research findings and key insights}

**Target Audience**: Technical decision makers evaluating options

## Prerequisites

### Required Knowledge

To fully understand the research findings and options presented in this document:

- **{Category Name}**
  - {Item Name}: {Brief description} - Reference: [{Document Title}]({URL})
    ...
    ...

## Problem Statement

### Context

{Describe the technical challenge or requirement that prompted this research}

### Requirements

- {Specific requirement or constraint}
- {Performance/scalability needs}
- {Compatibility requirements}
- {Security considerations}
- ...

## Options Analysis

### Option 1: {Library/Pattern/Solution Name}

**Overview**
{Brief description of the solution}

**Key Features**

- {Feature 1}
- {Feature 2}
- {Feature 3}

**Implementation Example**

```typescript
// Example code showing typical usage
{code example}
```

**Pros**

- {Advantage 1}
- {Advantage 2}
- {Advantage 3}

**Cons**

- {Disadvantage 1}
- {Disadvantage 2}

**Metrics**

- **Community**: Stars: {number}, Contributors: {number}, Last Commit: {date}
- **Package**: Downloads: {number}, Version: {version}
- **Documentation**: {Complete/Partial/Minimal}

### Option 2: {Library/Pattern/Solution Name}

{Repeat same structure as Option 1}

### Option 3: {Library/Pattern/Solution Name}

{Repeat same structure as Option 1}

## Comparison Matrix

| Criteria          | Option 1                  | Option 2                  | Option 3                  |
| ----------------- | ------------------------- | ------------------------- | ------------------------- |
| Technical Fit     | {score/rating}            | {score/rating}            | {score/rating}            |
| Performance       | {metric}                  | {metric}                  | {metric}                  |
| Learning Curve    | {Low/Medium/High}         | {Low/Medium/High}         | {Low/Medium/High}         |
| Community Support | {Active/Moderate/Limited} | {Active/Moderate/Limited} | {Active/Moderate/Limited} |
| Documentation     | {Excellent/Good/Poor}     | {Excellent/Good/Poor}     | {Excellent/Good/Poor}     |
| Type Safety       | {Full/Partial/None}       | {Full/Partial/None}       | {Full/Partial/None}       |
| Bundle Size       | {size}                    | {size}                    | {size}                    |
| Maintenance Risk  | {Low/Medium/High}         | {Low/Medium/High}         | {Low/Medium/High}         |

## Decision Flow for Pattern Selection

```mermaid
%%{init: {'theme': 'base'} }%%
graph TD
    A[Start] --> B{Condition X?}
    B -- Yes --> C[Pattern A]
    B -- No --> D{Condition Y?}
    D -- Case 1 --> E[Pattern B]
    D -- Case 2 --> F[Pattern C]
```

## Implementation Patterns

### Pattern {A|B|...}: {Pattern Name}

#### Data Flow

```mermaid
%%{init: {'theme': 'base'} }%%
sequenceDiagram
    box Frontend
        participant Component1
    end
    box Backend Services
        participant Component2
        participant Component3
    end

    Note over Component1: User initiates action
    Component1->>Component2: Step 1: Request data
    Note right of Component2: Validate request
    Component2->>Component3: Step 2: Process data
    Note over Component3: Apply business logic
    Component3-->>Component1: Response with result
    Note over Component1,Component3: Complete transaction
```

#### Implementation

```typescript
// Detailed implementation example
{code showing the pattern}
```

**When to use**:

- {Scenario 1}
- ...

**When not to use**:

- {Scenario 1}
- ...

**Best Practices**:

- {Best practice 1}
- ...

{Repeat for each additional pattern...}

## Analysis Summary

### Evaluation Results

{Summarize the key findings from the comparison matrix and options analysis without making recommendations}

### Key Considerations for Decision Making

- **Performance Requirements**: {How each option addresses performance needs}
- **Development Experience**: {Impact on developer productivity and learning curve}
- **Maintenance Burden**: {Long-term maintenance implications of each option}
- **Community Support**: {Availability of resources and community health}
- **Security Implications**: {Security considerations for each option}

### Trade-offs Analysis

- **Option 1 Trade-offs**
  - Gains: {What you get}
  - Costs: {What you sacrifice}
- **Option 2 Trade-offs**
  - Gains: {What you get}
  - Costs: {What you sacrifice}
- **Option 3 Trade-offs**
  - Gains: {What you get}
  - Costs: {What you sacrifice}

### Risk Assessment

| Option   | Risk Level        | Primary Risks | Mitigation Strategies |
| -------- | ----------------- | ------------- | --------------------- |
| Option 1 | {Low/Medium/High} | {Main risks}  | {How to mitigate}     |
| Option 2 | {Low/Medium/High} | {Main risks}  | {How to mitigate}     |
| Option 3 | {Low/Medium/High} | {Main risks}  | {How to mitigate}     |

### Scenario-Based Analysis

- **If performance is critical**: {Which options are suitable and why}
- **If rapid development is priority**: {Which options are suitable and why}
- **If long-term maintenance is key**: {Which options are suitable and why}
- **If type safety is essential**: {Which options are suitable and why}
- **If bundle size must be minimal**: {Which options are suitable and why}

## References

- {List relevant documentation and resources}
  ...

## Appendix

### Information Sources Consulted

- **Context7 MCP**: {Libraries and versions examined - e.g., `/react-query v5`, `/zustand v4.5`}
- **DeepWiki MCP**: {Repositories analyzed - e.g., `tanstack/query`, `pmndrs/zustand`}
- **WebSearch**: {Key search queries and findings}
- **npm view**: {Package metadata commands used}
- **GitHub Analysis**: {Issues, PRs, and discussions reviewed}

### Search Queries Used

```
{Search Query Used}
...
```

### Commands Used

```bash
{npm view commands, git commands, etc.}
...
```

### Limitations

- {Any gaps in available information}
- {Areas requiring further investigation}
