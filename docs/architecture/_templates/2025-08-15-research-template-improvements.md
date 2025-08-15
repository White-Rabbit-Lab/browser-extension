# Research Template Improvements

Based on the research process for Browser Extension Storage APIs (2025-08-15)

## Executive Summary

This document captures improvements for the research template based on the actual usage experience when creating the Browser Extension Storage API research document. The improvements focus on clarifying the requirements gathering process, enhancing the research methodology, and providing better guidance for LLMs.

## Conversation Analysis

### Requirements Gathering Process

#### Questions Asked by LLM

1. **Question 1: Research Purpose and Background**
   - What is the main purpose of this research experiment?
   - Options provided: Update existing research, different perspective, template testing, new requirements
   - User response: Template-based research process testing

2. **Question 2: Specific Technical Domain**
   - Which aspect of data persistence to focus on?
   - Options: Storage APIs, state management integration, offline sync, cache strategies
   - User response: Browser extension storage APIs in general

3. **Question 3: Specific Requirements and Constraints**
   - Target browsers (Chrome only, Firefox included, Safari, all major)
   - Manifest version (V3 only, V2 to V3 migration, V3 specific)
   - Data size (small, medium, large, all)
   - Security requirements (normal, encrypted, enterprise)
   - User response: All conditions comprehensive, used as criteria for Implementation Strategy Selection Guide

4. **Question 4: Technology Options to Evaluate**
   - List of potential technologies to evaluate
   - Confirmation of excluded technologies
   - Request for additional libraries to consider
   - User response: Use Information Gathering to determine options independently

### Key Insights from the Process

#### Strengths of Current Template

1. **Clear Structure**: The template provides a well-organized structure for comprehensive research
2. **Neutrality Focus**: Strong emphasis on avoiding bias and recommendations
3. **Implementation Examples**: Requirement for working code examples is valuable
4. **Exclusion Documentation**: Clear guidance on documenting excluded technologies

#### Areas for Improvement

1. **Requirements Gathering Phase**
   - No explicit guidance on initial user interaction
   - Missing structured question framework
   - Unclear when LLM should stop asking questions

2. **Research Scope Definition**
   - Template doesn't specify minimum/maximum number of options
   - Unclear guidance on depth vs. breadth of research

3. **Implementation Strategy Section**
   - Could benefit from clearer distinction between strategies and options
   - Need for standardized strategy naming conventions

## Proposed Template Enhancements

### 1. Add Requirements Gathering Section

```markdown
<!--
REQUIREMENTS GATHERING PHASE (For LLM):

Before starting research, gather requirements by asking these questions in order:

1. RESEARCH CONTEXT
   - Is this updating existing research or creating new research?
   - What triggered this research need?

2. TECHNICAL SCOPE
   - What specific technical domain or problem area?
   - Are there any technologies you already know you want to evaluate?

3. CONSTRAINTS & REQUIREMENTS
   - Target environment (browsers, versions, etc.)
   - Performance requirements
   - Security requirements
   - Budget/size constraints

4. EVALUATION PREFERENCES
   - Should I determine options through research or do you have specific ones?
   - Any technologies to explicitly exclude?

Stop asking questions when:
- User provides comprehensive requirements
- User explicitly says to proceed with research
- User delegates decision-making to LLM ("you decide")
-->
```

### 2. Enhance Research Methodology Section

```markdown
4. RESEARCH METHODOLOGY
   Step 0: Requirements Analysis
   - Review gathered requirements
   - Identify key evaluation criteria based on requirements
   - Determine if requirements suggest specific technology categories

   Step 1: Technology Discovery
   - Start broad, then narrow based on requirements
   - Use multiple sources to discover options:
     - Current codebase analysis (Serena MCP)
     - Modern alternatives search (WebSearch)
     - Package ecosystem exploration (npm)
   - Document why each technology was selected for evaluation
```

### 3. Add Guidance for Dynamic Option Count

```markdown
Step 2: Option Evaluation (adaptive count)
Minimum options: 3
Maximum options: 6

    When to evaluate more options:
    - Diverse requirements (e.g., both small and large data)
    - Multiple distinct technology categories
    - User explicitly requests comprehensive analysis

    When to limit options:
    - Narrow, specific use case
    - Clear technology category dominance
    - Time or scope constraints
```

### 4. Improve Implementation Strategy Guidance

```markdown
## Implementation Strategies

Strategies should represent different APPROACHES to solving the problem,
not just different libraries. Examples:

Good Strategy Names:

- "Simple Key-Value Storage" (approach focused)
- "Large Dataset Management" (use case focused)
- "Hybrid Storage Approach" (architecture focused)

Poor Strategy Names:

- "Using Chrome Storage" (library focused)
- "Option 1 Implementation" (not descriptive)

Each strategy should:

1. Solve a specific use case or requirement set
2. Potentially use multiple technologies from options
3. Include decision criteria for when to use
```

### 5. Add Template Meta-Instructions

```markdown
<!--
TEMPLATE USAGE PATTERNS:

1. EXPLORATORY RESEARCH
   - User has a problem but no specific solution in mind
   - Emphasize discovery and broad evaluation
   - Include more options (4-6)

2. COMPARATIVE RESEARCH
   - User knows specific technologies to compare
   - Focus on detailed comparison
   - Deeper analysis of fewer options (3-4)

3. MIGRATION RESEARCH
   - User needs to move from one technology to another
   - Include migration paths in strategies
   - Focus on compatibility and transition costs
-->
```

## Recommended Template Structure Changes

### Current Structure Issues

1. **Problem Statement** comes before understanding what the user actually needs
2. **Excluded Technologies** section placement suggests pre-determination
3. **Implementation Strategies** relationship to options unclear

### Proposed New Structure

```markdown
1. Research Context (NEW)
   - Requirements gathered from user
   - Scope and constraints
2. Problem Statement
   - Context (informed by requirements)
   - Requirements (validated with user)
3. Research Methodology (EXPANDED)
   - How options were discovered
   - Why each was selected
4. Technology Assessment
   - Individual option analysis
5. Excluded Technologies (MOVED)
   - After seeing what's available
6. Technology Comparative Analysis
   - Side-by-side comparison
7. Implementation Strategies
   - Approaches using assessed technologies
8. Strategy Selection Guide
   - Decision flow based on requirements
```

## Process Improvements

### For LLM Implementers

1. **Start with Questions**: Always begin with structured requirements gathering
2. **Explain the Process**: Tell user you'll ask a few questions first
3. **Adaptive Questioning**: Skip questions if user provides comprehensive initial context
4. **Confirm Understanding**: Summarize requirements before starting research

### For Template Maintainers

1. **Version the Template**: Include template version in research documents
2. **Provide Examples**: Add example research documents as references
3. **Regular Reviews**: Update based on usage patterns and feedback
4. **Clear Escape Hatches**: Specify when to deviate from template

## Validation Checklist Enhancement

Current checklist focuses on output quality. Add process checks:

```markdown
7. QUALITY CHECKLIST
   Process Checks:
   □ Requirements gathering completed
   □ User confirmed scope
   □ Technology discovery documented
   □ Exclusion rationale provided

   Output Checks:
   □ At least 3 options evaluated
   □ All evaluation criteria applied consistently
   □ Code examples tested and complete
   □ All sources documented in Appendix
   □ Neutral tone maintained throughout
   □ No prescriptive statements included
```

## Conclusion

The research template is fundamentally sound but would benefit from:

1. Explicit requirements gathering phase
2. More flexible option count guidance
3. Clearer strategy vs. option distinction
4. Process documentation requirements
5. Adaptive usage patterns

These improvements would make the template more effective for both LLM agents and human researchers while maintaining the valuable neutrality and comprehensiveness of the current version.

## References

- Original conversation: Browser Extension Storage API Research (2025-08-15)
- Template version used: 2bf0f2d
- Research document created: `/docs/architecture/researches/2025-08-15-browser-extension-storage-apis.md`
