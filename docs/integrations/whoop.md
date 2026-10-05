# WHOOP Connector

LOOP uses WHOOP's supported OAuth 2.0 Developer API rather than reverse-engineering the wearable.

## Initial scopes

- read:recovery
- read:cycles
- read:workout
- read:sleep
- read:profile
- read:body_measurement
- offline for refresh tokens

Only request scopes the product actually needs. WHOOP recommends limiting requested scopes. See the official developer documentation.

## Security

The WHOOP client secret must remain server-side. Never expose it in Vite client code or a mobile application, and never commit it to GitHub.

## API resources

The connector targets:

- /v2/user/profile/basic
- /v2/user/measurement/body
- /v2/cycle
- /v2/recovery
- /v2/activity/sleep
- /v2/activity/workout

## Next implementation step

Add a server-side OAuth callback and encrypted per-user token storage. Tokens should never be persisted in browser localStorage.

WHOOP requires explicit end-user authorization before an application accesses that user's data.
