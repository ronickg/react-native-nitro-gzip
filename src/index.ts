import { NitroModules } from 'react-native-nitro-modules'
import type { Gzip } from './specs/Gzip.nitro'

export * from './specs/Gzip.nitro'

export const gzip = NitroModules.createHybridObject<Gzip>('Gzip')
