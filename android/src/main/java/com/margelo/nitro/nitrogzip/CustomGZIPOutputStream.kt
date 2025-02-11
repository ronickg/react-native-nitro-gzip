package com.margelo.nitro.nitrogzip

import java.io.OutputStream
import java.util.zip.Deflater
import java.util.zip.GZIPOutputStream

class CustomGZIPOutputStream(
    out: OutputStream,
    size: Int = DEFAULT_BUFFER_SIZE,
    compressionLevel: Int = Deflater.DEFAULT_COMPRESSION,
    syncFlush: Boolean = false
) : GZIPOutputStream(
    out,
    size,
    syncFlush
) {
    companion object {
        private const val DEFAULT_BUFFER_SIZE = 512
    }

    init {
        // Create a new deflater with the specified compression level
        // The 'true' parameter is for GZIP compatibility (nowrap)
        def = Deflater(compressionLevel, true)
    }
}