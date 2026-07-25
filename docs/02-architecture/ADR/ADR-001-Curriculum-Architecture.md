# Module Development Checklist

## Purpose

This checklist defines the standard process for implementing backend modules in CareerReady AI.

All backend modules should follow this process unless an Architecture Decision Record (ADR) explicitly states otherwise.

---

# Phase 1 — Domain Review

## Product Review

- [ ] Verify the PRD supports the module.
- [ ] Review the database model.
- [ ] Verify relationships.
- [ ] Confirm naming conventions.
- [ ] Identify validation rules.

---

# Phase 2 — Database

## Prisma

- [ ] Update Prisma schema.
- [ ] Run Prisma format.
- [ ] Run Prisma validate.
- [ ] Create migration.
- [ ] Verify migration.
- [ ] Generate Prisma Client.

---

# Phase 3 — DTOs

- [ ] Create Create DTO.
- [ ] Create Update DTO.
- [ ] Add validation decorators.
- [ ] Add Swagger decorators.

---

# Phase 4 — Mapper

Responsibilities

- DTO → Prisma
- Prisma → Response

Checklist

- [ ] toCreate()
- [ ] toUpdate()
- [ ] toResponse()

Rules

- No business logic.
- No repository calls.
- No validation.

---

# Phase 5 — Repository

Responsibilities

- Database access only.

Checklist

- [ ] create()
- [ ] findMany()
- [ ] findById()
- [ ] findByIdIncludingDeleted()
- [ ] findByCode()
- [ ] findBySlug()
- [ ] update()
- [ ] softDelete()
- [ ] restore()

Rules

- No business logic.
- No validation.
- No HTTP exceptions.

---

# Phase 6 — Service

Responsibilities

- Business rules.
- Validation.
- Orchestration.

Checklist

- [ ] create()
- [ ] findAll()
- [ ] findOne()
- [ ] update()
- [ ] remove()
- [ ] restore()

Validation

- [ ] Parent entity exists.
- [ ] Code is unique.
- [ ] Slug is unique.

Rules

- Services own business logic.
- Services call repositories.
- Services call mappers.

---

# Phase 7 — Controller

Endpoints

- [ ] POST /
- [ ] GET /
- [ ] GET /:id
- [ ] PATCH /:id
- [ ] DELETE /:id
- [ ] PATCH /:id/restore

Rules

- Thin controllers.
- No business logic.
- Delegate to services.

---

# Phase 8 — Module

Checklist

- [ ] Register controller.
- [ ] Register service.
- [ ] Register repository.
- [ ] Import dependent modules.
- [ ] Export required providers.

---

# Phase 9 — Manual Testing

CRUD

- [ ] Create
- [ ] Read
- [ ] Update
- [ ] Delete
- [ ] Restore

Validation

- [ ] Invalid parent.
- [ ] Duplicate code.
- [ ] Duplicate slug.
- [ ] Invalid ID.
- [ ] Soft delete.
- [ ] Restore deleted entity.

Swagger

- [ ] Endpoints visible.
- [ ] DTOs rendered correctly.

---

# Phase 10 — Sprint Review

Engineering

- [ ] Update sprint board.
- [ ] Update documentation.
- [ ] Record ADRs (if required).
- [ ] Update roadmap (if required).

---

# Definition of Done

A backend module is considered complete when:

- Database migration succeeds.
- CRUD endpoints work.
- Validation rules pass.
- Swagger is updated.
- Manual testing passes.
- Documentation is updated.
- Sprint checklist is updated.

Automated tests and performance improvements are handled during the scheduled Optimization Sprint.