import { init } from '@paralleldrive/cuid2'

const createId = init({
  length: 8,
})

export function createProjectId() {
  return `pro_${createId()}`
}

export function createCollaboratorId() {
  return `col_${createId()}`
}

export function createTranslationId() {
  return `tra_${createId()}`
}

export function createGenerationId() {
  return `gen_${createId()}`
}
