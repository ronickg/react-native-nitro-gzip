# react-native-nitro-gzip

React Native Gzip compression/decompression library built with Nitro Modules.

## Installation

```bash
yarn add react-native-nitro-modules react-native-nitro-gzip
```

## Usage

```typescript
import Gzip from 'react-native-nitro-gzip';

// Compress data
const input = new TextEncoder().encode('Hello World').buffer
const compressed = await Gzip.deflate(input, { level: 9 })

// Decompress data
const decompressed = await Gzip.inflate(compressed)
const text = new TextDecoder().decode(decompressed)
```

### GzipOptions

```typescript
interface GzipOptions {
  level?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  chunkSize?: number
}
```

## Info

- **chunkSize** option is only supported on Android
- iOS uses native SwiftGzip implementation
- Android uses Java's GZIPInputStream/GZIPOutputStream
