# Studio component

This package handles the Sanity studio that can be connected to 
a front-end app which renders the rich content.

# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)


## To add new datatypes

- create and export ___Type.ts file under `./schemaTypes`
    - Pay attention to variable names and make sure they
      match the filename.
    - Pay attention to the 'name' property/field they need 
      to be unique, be particularly careful if copying from
      other schema types
- Add new ___Type to export statement in `./schemaTypes/index.ts`
    - See export line in index.ts below: 

```
export const schemaTypes = [eventType, artistType, venueType, blogPostType]
```

## AppId

```
Add appId: 'flxejc5o6dl3kzobubjxjgwh'
to the `deployment` section in sanity.cli.js or sanity.cli.ts
to avoid prompting for application id on next deploy.
```