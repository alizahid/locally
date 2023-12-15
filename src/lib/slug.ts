import { init } from '@paralleldrive/cuid2'
import { z } from 'zod'

const createId = init({
  length: 8,
})

export const ProjectIdSchema = z.string().regex(/^prj_[a-z0-9]{8}$/)

export function createProjectId() {
  return `prj_${createId()}`
}

export const CollaboratorIdSchema = z.string().regex(/^clb_[a-z0-9]{8}$/)

export function createCollaboratorId() {
  return `clb_${createId()}`
}

export const TranslationIdSchema = z.string().regex(/^trn_[a-z0-9]{8}$/)

export function createTranslationId() {
  return `trn_${createId()}`
}

export const GenerationIdSchema = z.string().regex(/^gen_[a-z0-9]{8}$/)

export function createGenerationId() {
  return `gen_${createId()}`
}
