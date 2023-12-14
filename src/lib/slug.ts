import { init } from '@paralleldrive/cuid2'

const createId = init({
  length: 8,
})

export function createProjectId() {
  return `prj_${createId()}`
}

export function createCollaboratorId() {
  return `clb_${createId()}`
}

export function createTranslationId() {
  return `trn_${createId()}`
}

export function createGenerationId() {
  return `gen_${createId()}`
}
