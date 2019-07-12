ecs-components
==============================================================================

[Short description of the addon.]


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ecs-components
```


Usage
------------------------------------------------------------------------------

### Development Mode

```
yarn install
```

On the project to use this addon:
```
yarn add ~/Direction/to/addon
```

```
ember serve
```

### To include in on your project

package.json
```
"devDependencies": {
  "ecs-components": "git+https://github.com/ecaresoft/ecs-components.git#branch-to-use"
}
```

### Available Components

#### ecs input

Simple input to mut value, uses the same focus on Cirrus & Nimbo

```
  {{ecs-input
      classNames=(local-class "local-class") // CSS modules
      value=model.attr
      placeholder=(t "placeholder")
      type="text"
      dataAutoId="data-auto-id-to-use"
    }}
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
