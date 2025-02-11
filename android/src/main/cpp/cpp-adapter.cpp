#include <jni.h>
#include "NitroGzipOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *)
{
  return margelo::nitro::nitrogzip::initialize(vm);
}
