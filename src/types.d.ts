export type Env = {
    Bindings: {
        spft_DB: Hyperdrive,
        spft_reqLimiter: KVNamespace
        spft_cache: KVNamespace
        spft_token: KVNamespace
        AI: Ai
    }
}