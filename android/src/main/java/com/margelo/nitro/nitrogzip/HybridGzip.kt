package com.margelo.nitro.nitrogzip

import android.util.Base64
import android.util.Log
import com.margelo.nitro.core.ArrayBuffer
import com.margelo.nitro.core.Promise
import java.io.ByteArrayOutputStream
import java.util.zip.GZIPInputStream
import java.util.zip.GZIPOutputStream
import java.io.ByteArrayInputStream
import java.nio.ByteBuffer
import java.io.IOException

import java.util.zip.Deflater

class HybridGzip : HybridGzipSpec() {
    companion object {
        private const val TAG = "HybridGzip"
        private const val DEFAULT_BUFFER_SIZE = 8192
    }

    override fun inflate(base64: String, options: GzipOptions?): Promise<ArrayBuffer> {
        // Decode base64 synchronously on JS thread
        val compressedData = Base64.decode(base64, Base64.DEFAULT)
            ?: throw Error("Invalid base64 input")

        return Promise.async {
            try {
                val bufferSize = options?.chunkSize?.toInt() ?: DEFAULT_BUFFER_SIZE

                ByteArrayOutputStream(compressedData.size * 2).use { outputStream ->
                    GZIPInputStream(ByteArrayInputStream(compressedData), bufferSize).use { gzipInputStream ->
                        val buffer = ByteArray(bufferSize)
                        var bytesRead: Int

                        while (gzipInputStream.read(buffer).also { bytesRead = it } != -1) {
                            outputStream.write(buffer, 0, bytesRead)
                        }
                    }
                    ArrayBuffer.copy(ByteBuffer.wrap(outputStream.toByteArray()))
                }
            } catch (e: Exception) {
                Log.e(TAG, "Inflation failed", e)
                throw e
            }
        }
    }

    override fun deflate(input: ArrayBuffer, options: GzipOptions?): Promise<String> {
        val byteArray = with(input.getBuffer(false)) {
            rewind()
            ByteArray(remaining()).apply { get(this) }
        }

        return Promise.async {
            try {
                val bufferSize = options?.chunkSize?.toInt() ?: DEFAULT_BUFFER_SIZE
                val compressionLevel = options?.level?.toInt() ?: Deflater.DEFAULT_COMPRESSION

                ByteArrayOutputStream(byteArray.size).use { outputStream ->
                    CustomGZIPOutputStream(
                        out = outputStream,
                        size = bufferSize,
                        compressionLevel = compressionLevel
                    ).use { gzipStream ->
                        gzipStream.write(byteArray)
                    }
                    Base64.encodeToString(outputStream.toByteArray(), Base64.NO_WRAP)
                }
            } catch (e: Exception) {
                Log.e(TAG, "Deflation failed", e)
                throw e
            }
        }
    }
}