# my-component



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute         | Description | Type      | Default     |
| ----------------- | ----------------- | ----------- | --------- | ----------- |
| `environment`     | `environment`     |             | `string`  | `undefined` |
| `language`        | `language`        |             | `string`  | `undefined` |
| `person_id`       | `person_id`       |             | `number`  | `undefined` |
| `show_print`      | `show_print`      |             | `boolean` | `false`     |
| `token_api_nimbo` | `token_api_nimbo` |             | `string`  | `undefined` |


## Dependencies

### Depends on

- [auto-complete](../auto-complete)
- [vaccine-table](../vaccine-table)
- [vaccination-card](../vaccination-card)

### Graph
```mermaid
graph TD;
  vaccination-module --> auto-complete
  vaccination-module --> vaccine-table
  vaccination-module --> vaccination-card
  vaccine-table --> modal-dialog
  style vaccination-module fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
