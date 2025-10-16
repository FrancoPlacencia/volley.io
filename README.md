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
ng build --configuration production
```

## Responsive
Media sizes
```css
/* mobile */
@media(max-width: 480px){}

/* tablets */
@media(min-width: 481px) and (max-width: 768px){}

/* laptops */
@media(min-width: 769px) and (max-width: 1024px){}

/* desktops */
@media(min-width: 1025px) and (max-width: 1200px){}

/* tv */
@media(min-width: 1201px) {}
```

