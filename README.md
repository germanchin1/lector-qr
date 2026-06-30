# Lector rápido

Página web sin instalación para pegar un código en el móvil y verlo al instante en el PC con sincronización en tiempo real.

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

3. Abre `index.html` y rellena:
	 - `Supabase URL`
	 - `Supabase anon key`
	 - `Nombre de la sala`
4. Guarda la configuración en el móvil y en el PC usando los mismos datos.
5. Sube el archivo a Vercel y abre la misma URL en ambos dispositivos.

## Qué hace

- Muestra el último valor pegado en grande.
- Sincroniza el valor con la tabla `scan_state`.
- Escucha cambios en tiempo real entre dispositivos.
- Mantiene historial local de los últimos códigos.
