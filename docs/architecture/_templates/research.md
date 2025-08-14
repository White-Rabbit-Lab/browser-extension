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

3. RESEARCH METHODOLOGY
    Step 1: Information Gathering
    - Context7 MCP: Get latest library documentation (e.g., `/react-query`, `/zustand`)
    - DeepWiki MCP: Analyze repository structure (e.g., `tanstack/query`)
    - WebSearch: Find current best practices and tutorials
    - npm view: Collect package metadata and statistics
    - GitHub: Review issues for known problems and solutions

    Step 2: Option Evaluation (minimum 3 alternatives)
    Apply these criteria consistently with weights:
    - Technical Fit (30%): Problem-solution alignment
    - Performance (25%): Bundle size, runtime metrics
    - Developer Experience (20%): Learning curve, API design
    - Maintenance (15%): Community health, update frequency
    - Security (10%): Vulnerability track record

    Step 3: Documentation
    - Record all sources in Appendix section
    - Include exact commands and queries used
    - Note information gaps or limitations
    - Use recent information (verify publication dates)

4. CONTENT GUIDELINES
    Required Elements:
    - Title: Clear, descriptive research topic
    - Status: In Progress | Completed | Archived
    - Executive Summary: 2-3 sentences, neutral findings only
    - Comparison Matrix: Systematic evaluation table
    - Code Examples: Working implementations with error handling

    Writing Style:
    - Language: English only
    - References: @ for internal, URLs for external
    - Code: Proper syntax highlighting
    - Libraries: Always in backticks
    - Lists: Prefer bullets over tables for readability

5. IMPORTANT RULES
    - NO recommendations or "best choice" statements
    - NO subjective opinions or preferences
    - NO bias toward any option
    - Present facts and analysis only
    - Let humans make the decisions

6. QUALITY CHECKLIST
    Before submitting:
    □ At least 3 options evaluated
    □ All evaluation criteria applied consistently
    □ Code examples tested and complete
    □ All sources documented in Appendix
    □ Neutral tone maintained throughout
    □ No prescriptive statements included
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
