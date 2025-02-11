import Foundation
import NitroModules
import Gzip

class HybridGzip: HybridGzipSpec {
    func inflate(base64: String, options: GzipOptions?) throws -> Promise<ArrayBufferHolder> {
        // Get data on JS thread first
        guard let compressedData = Data(base64Encoded: base64) else {
            throw NSError(domain: "GzipError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid base64 input"])
        }

        return Promise.async {
            let decompressed = try compressedData.gunzipped()
            return try ArrayBufferHolder.copy(data: decompressed)
        }
    }

    func deflate(input: ArrayBufferHolder, options: GzipOptions?) throws -> Promise<String> {
        // Get data on JS thread first
        let data = input.toData(copyIfNeeded: true)

        return Promise.async {
            let compressed = if let level = options?.level {
                try data.gzipped(level: CompressionLevel(rawValue: Int32(level)))
            } else {
                try data.gzipped()
            }
            return compressed.base64EncodedString()
        }
    }
}