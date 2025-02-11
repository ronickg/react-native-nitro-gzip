import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {gzip} from 'react-native-nitro-gzip';
import '@bacons/text-decoder/install';

export default function App() {
  useEffect(() => {
    runGzipTests();
  }, []);

  const runGzipTests = async () => {
    try {
      console.log('🧪 Starting GZIP tests...');

      // Test 1: Basic compression and decompression with options
      await testBasicCompression();

      // Test 2: Different compression levels
      await testCompressionLevels();

      // Test 3: Custom chunk sizes
      await testChunkSizes();

      // Test 4: Error handling
      await testErrorHandling();

      console.log('\n✅ All tests completed successfully!');
    } catch (error) {
      console.error('❌ Tests failed:', error);
    }
  };

  const testBasicCompression = async () => {
    console.log('\n📝 Test 1: Basic compression with default options');
    const testString = 'Hello, World!'.repeat(100);
    const testBuffer = new TextEncoder().encode(testString).buffer;

    console.log('Original size:', testBuffer.byteLength);

    const compressed = await gzip.deflate(testBuffer, {
      level: 6, // Default compression level
      chunkSize: 8192, // Default chunk size
    });

    console.log('Compressed (base64):', compressed.slice(0, 50) + '...');
    console.log(
      'Compression ratio:',
      (compressed.length / testBuffer.byteLength).toFixed(2),
    );

    const decompressed = await gzip.inflate(compressed);
    const resultString = new TextDecoder().decode(decompressed);

    console.log('Decompression successful:', resultString === testString);
    console.log(
      'Original size restored:',
      decompressed.byteLength === testBuffer.byteLength,
    );
  };

  const testCompressionLevels = async () => {
    console.log('\n📝 Test 2: Testing different compression levels');
    const testData = 'A'.repeat(10000);
    const testBuffer = new TextEncoder().encode(testData).buffer;

    const results: Record<number, number> = {};

    // Test each compression level
    for (const level of [1, 3, 6, 9] as const) {
      const compressed = await gzip.deflate(testBuffer, {level});
      results[level] = compressed.length;

      console.log(`Level ${level} compressed size:`, compressed.length);

      // Verify decompression works
      const decompressed = await gzip.inflate(compressed);
      const verified = new TextDecoder().decode(decompressed) === testData;
      console.log(`Level ${level} verification:`, verified ? '✅' : '❌');
    }
  };

  const testChunkSizes = async () => {
    console.log('\n📝 Test 3: Testing different chunk sizes');
    const largeString = 'B'.repeat(100000);
    const largeBuffer = new TextEncoder().encode(largeString).buffer;

    const chunkSizes = [4096, 8192, 16384];

    for (const chunkSize of chunkSizes) {
      console.log(`Testing chunk size: ${chunkSize}`);

      const compressed = await gzip.deflate(largeBuffer, {
        chunkSize,
        level: 6,
      });

      const decompressed = await gzip.inflate(compressed, {chunkSize});
      const verified = new TextDecoder().decode(decompressed) === largeString;

      console.log(
        `Chunk size ${chunkSize} verification:`,
        verified ? '✅' : '❌',
      );
    }
  };

  const testErrorHandling = async () => {
    console.log('\n📝 Test 4: Error handling');

    try {
      // Test invalid base64 input
      await gzip.inflate('not-valid-base64');
      console.log('❌ Should have thrown on invalid base64');
    } catch (error) {
      console.log('✅ Properly caught invalid base64:', error.message);
    }

    try {
      // Test invalid compression level
      await gzip.deflate(new ArrayBuffer(10), {
        level: 9, // Invalid level
      });
    } catch (error) {
      console.log('✅ Properly caught invalid level:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GZIP Tests</Text>
      <Text style={styles.subtitle}>Check console logs for results</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
