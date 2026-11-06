// OS-005.1 extends the original entrypoint with production subpath validation.
// The original root-only suite remains available for historical reproduction.
require(process.env.OS005_LEGACY_ROOT === '1' ? './os005-root-legacy.cjs' : './os0051-web.cjs');
