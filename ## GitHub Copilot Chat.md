## GitHub Copilot Chat

- Extension: 0.33.3 (prod)
- VS Code: 1.106.3 (bf9252a2fb45be6893dd8870c0bf37e2e1766d61)
- OS: win32 10.0.22631 x64
- GitHub Account: DainiusBanys

## Network

User Settings:

```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:

- DNS ipv4 Lookup: 140.82.121.5 (33 ms)
- DNS ipv6 Lookup: Error (30 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (32 ms)
- Electron fetch (configured): HTTP 200 (322 ms)
- Node.js https: HTTP 200 (286 ms)
- Node.js fetch: HTTP 200 (392 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:

- DNS ipv4 Lookup: 140.82.113.22 (72 ms)
- DNS ipv6 Lookup: Error (79 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (76 ms)
- Electron fetch (configured): HTTP 200 (697 ms)
- Node.js https: HTTP 200 (648 ms)
- Node.js fetch: HTTP 200 (811 ms)

Connecting to https://proxy.individual.githubcopilot.com/_ping:

- DNS ipv4 Lookup: 4.225.11.192 (38 ms)
- DNS ipv6 Lookup: Error (97 ms): getaddrinfo ENOTFOUND proxy.individual.githubcopilot.com
- Proxy URL: None (44 ms)
- Electron fetch (configured): HTTP 200 (242 ms)
- Node.js https: HTTP 200 (310 ms)
- Node.js fetch: HTTP 200 (328 ms)

Connecting to https://github.com: HTTP 200 (306 ms)
Connecting to https://telemetry.individual.githubcopilot.com/_ping: HTTP 200 (722 ms)

Number of system certificates: 54

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).
