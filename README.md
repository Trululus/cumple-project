# 🎂 Misión Cumpleaños: Una Sorpresa Especial Para Ti ✨

Experiencia web interactiva, moderna y festiva para celebrar el cumpleaños de una persona muy especial.

---

## 🎮 Flujo Completo de la Experiencia

1. **Pantalla de Acceso VIP & Bienvenida 🔐✨:**
   - Puerta secreta con animación de desbloqueo.
   - Acepta por defecto: `cumple`, `cumpleaños`, `cumpleanos`, `fiesta`, `amigo`, `amiga`, `vip` o nombres personales.
   - Reconoce al cumpleañero/a y personaliza el saludo: `¡Hola, {nombre}! 🎂✨`.
   - Muestra el resumen de los 3 pasos de la misión.

2. **Nivel 1 — Álbum de Recuerdos Inolvidables 📸 (Estilo Polaroid):**
   - Tarjetas Polaroid modernas con inclinación, fecha, lugar, título y notas.
   - Selector Mosaico / Paso a Paso (carrusel táctil) en móviles.
   - Visor *Lightbox* ampliado al pulsar cada foto.
   - Mensaje de cierre con botón para avanzar a la ruleta.

3. **Nivel 2 — Ruleta de Premios & Deseos 🎡 (Sorteo Interactivo):**
   - Ruleta SVG circular animada con físicas de desaceleración realistas.
   - Sonido de tics sincronizado durante el giro y confeti al detenerse.
   - 6 opciones de premios y planes canjeables (Cena, Pastel/Helado, Cine, Ticket deseo, Café/bebidas, Aventura).
   - Guarda el premio ganado para la celebración final.

4. **Nivel 3 — La Gran Revelación & Celebración 🎉:**
   - Pregunta final: **"¿Quieres abrir tu sorpresa final de cumpleaños?"**
   - Dos botones:
     - **`¡SÍ, ABRIR REGALO! 🎁✨`**: Destacado, brillante y con resplandor dorado.
     - **`NO`**: Evasivo y juguetón; intenta escapar del ratón o del dedo en móvil con mensajes graciosos (*"¡Hoy no se aceptan excusas! 😂"*, *"¿Seguro? Mira que hay pastel... 🎂"*).
   - Al pulsar `SÍ`:
     - Tormenta continua de confeti de 5 segundos con cañones dobles.
     - Fanfarria polifónica triunfal sintetizada por Web Audio API.
     - Carta dedicatoria emotiva y felicitación personalizada.
     - Muestra oficial del premio ganado en la Ruleta.
     - Tira de fotos de recuerdos estilo cabina fotográfica.
     - Botones para lanzar más confeti o revivir la aventura.

---

## 🛠️ Cómo Personalizar Todo

Todo el contenido se edita en un único archivo:
👉 [`src/config/birthdayData.ts`](./src/config/birthdayData.ts)

### 1. Cambiar Claves y Nombres:
En la sección `access`:
```ts
validKeys: ['cumple', 'tu_clave', 'apodo'],
nameMapping: {
  'tu_clave': 'Nombre del Cumpleañero/a',
}
```

### 2. Poner Fotos Reales:
1. Guarda tus fotos en la carpeta [`public/photos/`](./public/photos/) (ej: `foto1.jpg`, `foto2.jpg`).
2. En `birthdayData.ts`, dentro de `memories.items`, actualiza el campo `image`:
   ```ts
   image: '/photos/foto1.jpg',
   date: '15 de Mayo',
   location: 'Lugar favorito ✨',
   title: 'Un día genial',
   note: 'Las risas que compartimos ese día.',
   tag: 'Aventura'
   ```

### 3. Personalizar Premios de la Ruleta:
En `wheel.prizes`, puedes modificar o agregar títulos, emojis y descripciones.

### 4. Personalizar la Carta Final:
En `celebration.revealed`, ajusta `title`, `letterParagraph1`, `letterParagraph2` y `letterSign`.

---

## 🚀 Ejecución

```bash
# Instalar dependencias (primera vez)
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción
npm run build
```

## Despliegue gratuito en Vercel

El proyecto es una web estática de Vite: no requiere base de datos, variables de entorno ni servidor.

1. Sube esta carpeta a un repositorio de GitHub.
2. En [Vercel](https://vercel.com/new), importa el repositorio y deja los valores detectados: **Framework: Vite**, **Build Command: `npm run build`** y **Output Directory: `dist`**.
3. Pulsa **Deploy**. Cada actualización que envíes a la rama principal volverá a publicarse automáticamente.

También puedes desplegar desde la terminal tras instalar la CLI de Vercel: `npx vercel`. La configuración incluida en `vercel.json` deja explícito el comando de compilación y la carpeta publicada.
