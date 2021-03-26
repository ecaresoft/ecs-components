# vaccination-card



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute         | Description | Type                   | Default     |
| ----------------- | ----------------- | ----------- | ---------------------- | ----------- |
| `environment`     | `environment`     |             | `string`               | `undefined` |
| `language`        | `language`        |             | `string`               | `undefined` |
| `person_id`       | `person_id`       |             | `number`               | `undefined` |
| `token_api_nimbo` | `token_api_nimbo` |             | `string`               | `undefined` |
| `vaccines`        | --                |             | `VaccineApplication[]` | `[]`        |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `vaccineDeleted` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [vaccination-module](../vaccination-module)

### Graph
```mermaid
graph TD;
  vaccination-module --> vaccination-card
  style vaccination-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
