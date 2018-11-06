# [Angular]CLI project with some basic components

## Global update:
```sh
$ npm uninstall -g @angular/cli
$ npm cache clean
$ npm install -g @angular/cli@latest
```

## Local update:
```sh
$ rmdir /S/Q node_modules dist
$ npm install --save-dev @angular/cli@latest
$ npm install
```

## Installing packages:
```npm
$ npm install @angular/flex-layout --save
$ npm install --save @angular/material @angular/cdk
$ npm install --save @angular/animations
```

## Building
```npm
$ ng build --prod
```

# [AngularJS]

## Listing packages & installing AngularJS:
```npm
$ npm list -g --depth=0
$ npm install angular@1.6.6
```

## Installing typings for AngularJS (without --global if not working):
```
$ npm install -g typings
$ typings install dt~angular --global --save
```

## Installing packages:
```
$ npm install -g bower
$ bower install bootstrap
$ bower install jquery
$ bower init                    // creating bower.json
```

## AngularCLI generate commands:
Scaffold  | Usage
---       | ---
[Component](https://github.com/angular/angular-cli/wiki/generate-component) | `ng g component my-new-component`
[Directive](https://github.com/angular/angular-cli/wiki/generate-directive) | `ng g directive my-new-directive`
[Pipe](https://github.com/angular/angular-cli/wiki/generate-pipe)           | `ng g pipe my-new-pipe`
[Service](https://github.com/angular/angular-cli/wiki/generate-service)     | `ng g service my-new-service`
[Class](https://github.com/angular/angular-cli/wiki/generate-class)         | `ng g class my-new-class`
[Guard](https://github.com/angular/angular-cli/wiki/generate-guard)         | `ng g guard my-new-guard`
[Interface](https://github.com/angular/angular-cli/wiki/generate-interface) | `ng g interface my-new-interface`
[Enum](https://github.com/angular/angular-cli/wiki/generate-enum)           | `ng g enum my-new-enum`
[Module](https://github.com/angular/angular-cli/wiki/generate-module)       | `ng g module my-module`


[Angular]: <https://angular.io>
[AngularJS]: <https://angularjs.org/>
