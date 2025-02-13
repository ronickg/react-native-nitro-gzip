///
/// HybridGzipSpec.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

#pragma once

#include <NitroModules/JHybridObject.hpp>
#include <fbjni/fbjni.h>
#include "HybridGzipSpec.hpp"




namespace margelo::nitro::nitrogzip {

  using namespace facebook;

  class JHybridGzipSpec: public jni::HybridClass<JHybridGzipSpec, JHybridObject>,
                         public virtual HybridGzipSpec {
  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/nitrogzip/HybridGzipSpec;";
    static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject> jThis);
    static void registerNatives();

  protected:
    // C++ constructor (called from Java via `initHybrid()`)
    explicit JHybridGzipSpec(jni::alias_ref<jhybridobject> jThis) :
      HybridObject(HybridGzipSpec::TAG),
      _javaPart(jni::make_global(jThis)) {}

  public:
    ~JHybridGzipSpec() override {
      // Hermes GC can destroy JS objects on a non-JNI Thread.
      jni::ThreadScope::WithClassLoader([&] { _javaPart.reset(); });
    }

  public:
    size_t getExternalMemorySize() noexcept override;

  public:
    inline const jni::global_ref<JHybridGzipSpec::javaobject>& getJavaPart() const noexcept {
      return _javaPart;
    }

  public:
    // Properties
    

  public:
    // Methods
    std::shared_ptr<Promise<std::shared_ptr<ArrayBuffer>>> inflate(const std::string& base64, const std::optional<GzipOptions>& options) override;
    std::shared_ptr<Promise<std::string>> deflate(const std::shared_ptr<ArrayBuffer>& input, const std::optional<GzipOptions>& options) override;

  private:
    friend HybridBase;
    using HybridBase::HybridBase;
    jni::global_ref<JHybridGzipSpec::javaobject> _javaPart;
  };

} // namespace margelo::nitro::nitrogzip
