import { type SchemaTypeDefinition } from 'sanity'
import { home } from './home'
import { outdoor } from './outdoor'
import { office } from './office'
import { blog } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, outdoor, office, blog],
}
