/**
 * This file contains the runtime code specific to the Turbopack development
 * ECMAScript "None" runtime (e.g. for Edge).
 *
 * It will be appended to the base development runtime code.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

/// <reference path="../base/dev-protocol.d.ts" />
/// <reference path="../base/runtime-base.ts" />
/// <reference path="../../../shared-node/base-externals-utils.ts" />
/// <reference path="../../../shared/require-type.d.ts" />

let DEV_BACKEND: DevRuntimeBackend;

type ExternalRequire = (
  id: ModuleId,
  esm?: boolean
) => Exports | EsmNamespaceObject;

type ExternalImport = (id: ModuleId) => Promise<Exports | EsmNamespaceObject>;

interface TurbopackDevContext extends TurbopackBaseContext<Module> {
  x: ExternalRequire;
  y: ExternalImport;
}

function augmentContext(context: TurbopackBaseContext<Module>): TurbopackDevContext {
  const nodejsContext = context as TurbopackDevContext;
  nodejsContext.x = externalRequire;
  nodejsContext.y = externalImport;
  return nodejsContext;
}

(() => {
  DEV_BACKEND = {
    restart: () => {
      throw new Error("restart is not supported");
    },
  };
})();

function _eval(_: EcmascriptModuleEntry) {
  throw new Error("HMR evaluation is not implemented on this backend");
}
