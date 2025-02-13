///
/// NitroGzipAutolinking.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

public final class NitroGzipAutolinking {
  public typealias bridge = margelo.nitro.nitrogzip.bridge.swift

  /**
   * Creates an instance of a Swift class that implements `HybridGzipSpec`,
   * and wraps it in a Swift class that can directly interop with C++ (`HybridGzipSpec_cxx`)
   *
   * This is generated by Nitrogen and will initialize the class specified
   * in the `"autolinking"` property of `nitro.json` (in this case, `HybridGzip`).
   */
  public static func createGzip() -> bridge.std__shared_ptr_margelo__nitro__nitrogzip__HybridGzipSpec_ {
    let hybridObject = HybridGzip()
    return { () -> bridge.std__shared_ptr_margelo__nitro__nitrogzip__HybridGzipSpec_ in
      let __cxxWrapped = hybridObject.getCxxWrapper()
      return __cxxWrapped.getCxxPart()
    }()
  }
}
