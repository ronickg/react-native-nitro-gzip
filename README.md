# react-native-nitro-gzip

React Native Gzip compression/decompression module using Nitro hybrid architecture.

## Installation

```bash
yarn add react-native-nitro-gzip react-native-nitro-modules
```

## Usage

```typescript
import { Gzip } from 'react-native-nitro-gzip'

// Compress data
const input = new TextEncoder().encode('Hello World').buffer
const compressed = await Gzip.deflate(input, { level: 9 })

// Decompress data
const decompressed = await Gzip.inflate(compressed)
const text = new TextDecoder().decode(decompressed)
```

## Options

### GzipOptions

```typescript
interface GzipOptions {
  level?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  chunkSize?: number
}
```

## Platform Notes

- **chunkSize** option is only supported on Android
- Compression level support is consistent across platforms
- iOS uses native SwiftGzip implementation
- Android uses Java's GZIPInputStream/GZIPOutputStream

```bash
yarn add react-native-nitro-modules
```

## Error Handling

Both `inflate` and `deflate` may throw errors for:

- Invalid input format
- Corrupted compressed data
- Memory allocation issues
- Platform-specific compression failures

Wrap operations in try/catch blocks:

```typescript
try {
  const result = await Gzip.inflate(data)
} catch (error) {
  console.error('Decompression failed:', error)
}
```