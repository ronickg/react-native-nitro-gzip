import type { HybridObject } from 'react-native-nitro-modules'

export interface GzipOptions {
  level?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 // More specific than just number
  chunkSize?: number
}
export interface Gzip
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  /**
   * Decompress a base64 encoded string into an ArrayBuffer
   * @param base64 - The compressed data as base64 string
   * @param options - Optional compression options
   * @throws {Error} When decompression fails
   */
  inflate(base64: string, options?: GzipOptions): Promise<ArrayBuffer>

  /**
   * Compress an ArrayBuffer into a base64 encoded string
   * @param input - The data to compress as ArrayBuffer
   * @param options - Optional compression options
   * @throws {Error} When compression fails
   */
  deflate(input: ArrayBuffer, options?: GzipOptions): Promise<string>
}
