# Lector rápido

Página web sin instalación para pegar un código en el móvil y verlo al instante en el PC.

La sincronización se hace con Supabase Broadcast desde el navegador, así que no necesitas API route ni backend propio en Vercel.

## Uso local

1. Abre `index.html` en el navegador.
2. Pega o escribe el código.
3. Usa el botón de copiar o selecciona el texto grande.

## Sincronización en vivo con Supabase

1. Crea un proyecto en Supabase.
2. Copia la URL del proyecto y la clave pública `sb_publishable_...` en `index.html`.
3. Sube el proyecto a Vercel como sitio estático normal.
4. Abre la misma URL en el móvil y en el PC.
5. Pega un código en un dispositivo y el otro lo verá por broadcast.

## Dónde encontrar los datos

### `Supabase URL`

Está escrita en `index.html` dentro de la constante `SUPABASE_URL`.

### `Supabase anon key`

Está escrita en `index.html` dentro de la constante `SUPABASE_ANON_KEY`.

### `Nombre de la sala`

Está escrita en `index.html` dentro de la constante `ROOM_NAME`.

## Qué hace

- Muestra el último valor pegado en grande.
- Sincroniza el valor con Supabase Broadcast en tiempo real.
- Mantiene historial local de los últimos códigos.
