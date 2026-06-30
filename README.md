# Lector rápido

Página web sin instalación para pegar un código en el móvil y verlo al instante en el PC.

Ahora el navegador no llama directo a Supabase: Vercel usa una ruta `/api/scan-state` como proxy, que evita el bloqueo CORS.

## Uso local

1. Abre `index.html` en el navegador.
2. Pega o escribe el código.
3. Usa el botón de copiar o selecciona el texto grande.

## Sincronización en vivo con Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta esta SQL en el editor de tablas:

```sql
create table if not exists public.scan_state (
	id text primary key,
	value text not null default '',
	updated_at timestamptz not null default now()
);

alter table public.scan_state enable row level security;

create policy "Allow public read" on public.scan_state
for select using (true);

create policy "Allow public insert" on public.scan_state
for insert with check (true);

create policy "Allow public update" on public.scan_state
for update using (true);
```

3. Sube el proyecto a Vercel con la carpeta raíz completa, incluyendo `index.html`, `api/scan-state.js` y `vercel.json`.
4. No uses un despliegue estático suelto ni subas solo `index.html`; la carpeta `api/` tiene que ir dentro del proyecto.
5. Abre la misma URL en ambos dispositivos.

## Dónde encontrar los datos

### `Supabase URL`

La usa el archivo `api/scan-state.js`.

### `Supabase anon key`

La usa el archivo `api/scan-state.js`.

### `Nombre de la sala`

Ahora está fijado como `lector-principal` en `api/scan-state.js`.

## Qué hace

- Muestra el último valor pegado en grande.
- Sincroniza el valor con la tabla `scan_state`.
- Escucha cambios en tiempo real entre dispositivos.
- Mantiene historial local de los últimos códigos.
