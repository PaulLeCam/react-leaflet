---
title: React Leaflet Core
---

## Introduction

React Leaflet's core APIs are implemented in the `@react-leaflet/core` package to provide a separation from the public APIs.
The goal of this package is to make most of React Leaflet's internal logic available to developers to easily implement custom behaviors, such as third-party Leaflet plugins.

## Audience

You might want to learn about the core APIs if you want to:

- Customize how public components work, by creating an alternative implementation matching your needs
- Implement new components not provided by React Leaflet
- Simply learn more about how React Leaflet works

If you're only interested in using the public APIs of React Leaflet, their usage is covered in the previous sections of this documenation, notably the [getting started](start-introduction.md) and [public API](api-map.md) pages.

## Installation

The `@react-leaflet/core` package is a dependency of the `react-leaflet` one. The main [installation steps](start-installation.md) from the getting started documentation should be followed to use the core APIs.

## Usage

All the [core APIs](core-api.md) can be imported from the `@react-leaflet/core` package, such as

```ts
import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'

export const ZoomControl = createControlComponent(
  (props) => new Control.Zoom(props),
)
```

The following page presents the architecture and usage in more details.
