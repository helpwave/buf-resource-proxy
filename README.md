# buf-resource-proxy

> A POST -> GET proxy for the [Buf Schema Registry](https://buf.build/product/bsr)'s GetResourceByName endpoint

## Why?

We use this proxy at [helpwave](https://helpwave.de/) as a [custom datasource](https://docs.renovatebot.com/modules/datasource/custom/) for [renovate](https://renovatebot.com/).

## How?

Make the following changes to your `renovate.json`:

```diff
  "customDatasources": {
+     "buf": {
+        "defaultRegistryUrlTemplate": "https://buf-resource-proxy.fly.dev/{{packageName}}",
+        "transformTemplates": ["{\"releases\":[{\"version\": resource.plugin.version }], \"sourceUrl\": resource.plugin.sourceUrl, \"homepage\": $join([\"https://buf.build/\", resource.plugin.owner, \"/\", resource.plugin.name])}"]
+     } 
  },
  "customManagers": [
+    {
+      "customType": "regex",
+      "fileMatch": ["buf.gen.yaml$"],
+      "matchStrings": [
+        "plugin: buf.build/(?<depName>.*?):(?<currentValue>.+?)\\s"
+      ],
+      "datasourceTemplate": "custom.buf",
+      "versioningTemplate": "semver"
+    }
  ]
```

> [!WARNING]
> This is not a helpwave product and `https://buf-resource-proxy.fly.dev/` may become unavailable at any time.
> You should deploy this on your own and make appropriate changes in the `renovate.json`.


MPL-2.0 licensed

