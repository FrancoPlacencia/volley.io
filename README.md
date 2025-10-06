# VolleyIo

### Creation of the project
```sh
# Generating the project
ng new volley-io
  # zoneless? Y
  # Stylesheet? Sass (SCSS)
  # SSR and SSG/Prerendering? N

ng add @angular/material
  # Theme - Azure/Blue
  # Global styles  - yes

ng add @angular-eslint/schematics

npm install prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev
```

### Deploying Proyect
```sh
ng build --output-path docs --base-href=/volley.io/
update index.html <base href="/volley.io/" />
```
