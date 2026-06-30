# Lector rápido

Página web sin instalación para pegar un código en el móvil y verlo al instante en el PC.

La sincronización se hace con una ruta `/api/scan-state` alojada en Vercel, así que solo necesitas desplegar el sitio.

## Uso local

1. Abre `index.html` en el navegador.
2. Pega o escribe el código.
3. Usa el botón de copiar o selecciona el texto grande.

## Sincronización en vivo

1. Sube el proyecto completo a Vercel.
2. Abre la misma URL en el móvil y en el PC.
3. Pega un código en un dispositivo y el otro lo verá en la siguiente actualización.

## Dónde encontrar los datos

### `Nombre de la sala`

Está escrita en `index.html` dentro de la constante `ROOM_NAME`.

## Qué hace

- Muestra el último valor pegado en grande.
- Sincroniza el valor a través de la ruta `/api/scan-state`.
- Mantiene historial local de los últimos códigos.
