# LOOP Health Core

LOOP uses a normalized health layer so the product is not coupled to one wearable vendor.

```
Provider -> Connector adapter -> Normalized Health Core -> Analytics -> Product surfaces
```

## Normalized record
- stable LOOP record id
- metric type
- canonical unit
- timestamp
- source
- confidence
- provider-specific metadata

Provider-specific fields belong in `metadata`; product logic should depend on canonical LOOP metrics.

WHOOP is the first integration target. The provider adapter stays separate until the current WHOOP API/access model is verified.