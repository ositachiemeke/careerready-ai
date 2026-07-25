# ADR-006: AI Content Generation Pipeline

**Status:** Accepted

**Date:** 2026-07-25

**Decision Makers:**
- Product Owner
- Engineering

---

# Context

CareerReady AI is an AI-powered aptitude test coaching platform focused on helping graduate trainees master reasoning frameworks used in SHL, Dragnet, GMAT, and similar assessments.

The platform's objective is not simply to provide a large question bank but to teach candidates how to reason through problems.

As the platform grows, manually creating and maintaining educational content becomes increasingly expensive and difficult to scale.

Artificial Intelligence provides an opportunity to accelerate content creation. However, allowing AI to generate production content at runtime introduces risks:

- Incorrect answers
- Hallucinated explanations
- Inconsistent difficulty
- Duplicate questions
- Poor educational quality
- High runtime costs

The platform therefore requires a structured content production pipeline rather than runtime content generation.

---

# Decision

CareerReady AI will use an **offline AI Content Generation Pipeline**.

AI-generated educational content will never be served directly to learners.

Every generated asset must pass review and publication before becoming available in production.

---

# Architecture

```
                 AI Content Generation

                 Framework Generator
                         │
                         ▼
                 Framework Package
                         │
                         ▼
                 Question Generator
                         │
                         ▼
                Explanation Generator
                         │
                         ▼
                   Hint Generator
                         │
                         ▼
                  Reviewer Engine
                         │
                         ▼
                 Human Review (optional)
                         │
                         ▼
                    Publisher
                         │
                         ▼
                Production Database
```

The learner-facing application consumes only published content.

---

# Content Generation Flow

## Step 1

Generate Framework Package

Outputs include:

- Recognition Pattern
- Learning Objective
- Strategy Summary
- Common Mistakes
- Framework Steps
- Hint Strategy

---

## Step 2

Generate Question Templates

Templates define the mathematical or logical structure of questions.

Example:

Arithmetic Progression

```
a

a+d

a+2d

a+3d

?
```

Templates improve consistency and reduce hallucinations.

---

## Step 3

Generate Questions

Questions are created from Framework Packages and Question Templates.

Each generated question includes:

- Stem
- Options
- Correct Answer
- Difficulty
- Framework
- Explanation
- Metadata

---

## Step 4

Generate Explanations

Generate:

- Detailed Explanation
- Short Explanation
- Hint Sequence
- Common Misconception

---

## Step 5

AI Review

A separate AI reviewer validates:

- Correct answer
- Logical consistency
- Framework alignment
- Difficulty
- Explanation quality
- Duplicate detection

Content failing review is rejected.

---

## Step 6

Human Review (Optional)

Editors may review generated content before publication.

Human review is required only when confidence thresholds are not met or for premium content.

---

## Step 7

Publish

Approved content is published into the production database.

Only published content is accessible by the application.

---

# Educational Philosophy

Frameworks represent reasoning strategies.

Questions are examples of applying those strategies.

CareerReady AI teaches frameworks rather than memorization.

The hierarchy is therefore:

Assessment Type

↓

Topic

↓

Concept

↓

Framework

↓

Framework Step

↓

Question

↓

Assessment

↓

AI Coach

---

# Runtime AI

Runtime AI is responsible for:

- Coaching
- Personalized explanations
- Hint generation
- Progress feedback
- Readiness analysis

Runtime AI does not generate production learning content.

---

# Quality Principles

Every published educational asset must satisfy:

- Correct
- Unambiguous
- Framework aligned
- Educationally valuable
- Traceable to a reasoning strategy

---

# Cost Strategy

CareerReady AI is a bootstrapped platform.

To minimize infrastructure costs:

- Generate content offline
- Cache generated assets
- Publish only approved content
- Avoid runtime generation where static content is sufficient

AI compute should be invested in creating reusable educational assets rather than repeatedly generating equivalent content.

---

# Future Enhancements

The pipeline may later support:

- Multiple AI models
- Automatic difficulty calibration
- Personalized question generation
- Semantic duplicate detection
- Embedding-based retrieval
- Human feedback loops
- Continuous content improvement

---

# Consequences

## Positive

- Lower runtime costs
- Higher educational quality
- Better consistency
- Easier editorial review
- Scalable content production
- Strong separation between content creation and content delivery

## Trade-offs

- More complex publishing workflow
- Additional review infrastructure
- Delayed availability of newly generated content

These trade-offs are acceptable because educational quality is prioritized over generation speed.

---

# Decision Summary

CareerReady AI will treat AI as a content production system rather than a runtime content generator.

Educational assets will be generated, reviewed, approved, and published before becoming available to learners.

This architecture provides a scalable, cost-effective, and high-quality foundation for AI-assisted educational content.