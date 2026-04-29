# Portafolio - Omar Miranda DEV

Portafolio personal para presentar mis proyectos, trabajos y repositorios públicos de GitHub. El sitio combina una portada visual, una descripción profesional y un listado dinámico que consume la API pública de GitHub para mostrar mis repositorios.

## Perfil

Desarrollador enfocado en aprender construyendo. Me interesa crear soluciones prácticas, interfaces claras y proyectos que me permitan crecer en web, backend y aplicaciones de escritorio.

## Características

- Diseño responsive y moderno.
- Sección de proyectos destacados.
- Carga automática de repositorios públicos desde GitHub.
- Buscador para filtrar proyectos por nombre o lenguaje.
- Estructura simple para publicar en GitHub Pages o cualquier hosting estático.

## Requisitos

- Un navegador moderno.
- Opcional: un servidor local estático para evitar restricciones del navegador al consumir la API de GitHub.

## Ejecutar en local

### Opción 1: abrir directamente

1. Abre `index.html` en el navegador.
2. Si GitHub bloquea la carga por `file://`, usa la opción 2.

### Opción 2: servidor local recomendado

Desde la carpeta del proyecto, ejecuta:

```bash
python -m http.server 4173
```

Luego abre:

```text
http://localhost:4173
```

## Estructura del proyecto

- `index.html`: estructura principal del portafolio.
- `styles.css`: estilos visuales y diseño responsive.
- `script.js`: carga de repositorios y filtros.

## Personalización rápida

- Edita el texto principal en `index.html` si quieres cambiar la presentación.
- Cambia los proyectos destacados en `script.js`.
- Ajusta colores, tipografía o distribución en `styles.css`.

## Despliegue

Puedes publicar este portafolio en:

- GitHub Pages.
- Netlify.
- Vercel.
- Cualquier hosting estático.

## Notas

- El listado de repositorios usa la API pública de GitHub.
- Si agregas nuevos repos públicos, aparecerán automáticamente en la sección dinámica.
- Contacto directo: +502 57156464, omar.xocoy2007@gmail.com, [LinkedIn](https://www.linkedin.com/in/ludwin-omar-xocoy-miranda-010a3a406/)