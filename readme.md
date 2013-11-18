# PR0D generator

Maintainer: [Alexandre Koch](https://github.com/hazart/generator-pr0d/)

Based on [yeoman-generator](https://github.com/yeoman/yeoman-generator/)

Inspired by [generator-footguard](https://github.com/mazerte/generator-footguard)
thanks to [Mathieu Desvé](https://github.com/mazerte/) for his advices.

## Usage

First make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Then install `generator-pr0d`:
```
npm install -g generator-pr0d
```

Run `yo pr0d`, optionally passing an app name:
```
yo pr0d
```

To see the result launch:
```
grunt
```

## Generators

Available generators:

* [pr0d](#app) (aka [pr0d:app](#app))
* [pr0d:collection](#collection)
* [pr0d:model](#model)
* [pr0d:view](#view)

## Commands

Available commands:

* [grunt](#server)
* [grunt server-dist](#server-dist)
* [grunt compile](#compile)
* [grunt build](#build)
* [grunt seo](#seo)
* [grunt seo-preprod](#seo-preprod)
* [grunt deploy](#deploy)
* [grunt deploy-preprod](#deploy-preprod)