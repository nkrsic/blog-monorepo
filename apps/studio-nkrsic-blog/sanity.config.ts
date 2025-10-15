import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { codeInput } from '@sanity/code-input'
import { latexInput } from 'sanity-plugin-latex-input'

export default defineConfig({
  name: 'default',
  title: 'nkrsic-blog',

  projectId: 'sojh3agt',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), codeInput(), latexInput()],

  schema: {
    types: schemaTypes,
  },
})
