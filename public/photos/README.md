# 📸 Carpeta de Fotos de Cumpleaños

Coloca aquí tus fotos reales para que se muestren en la experiencia web.

### Ejemplo de cómo nombrarlas:
- `foto1.jpg` (o `foto1.png`, `foto1.webp`)
- `foto2.jpg`
- `foto3.jpg`
- `foto4.jpg`

### Cómo vincularlas:
Abre el archivo `src/config/birthdayData.ts` y en el arreglo `memories` pon la ruta correspondiente:
```ts
{
  id: 'mem-1',
  memoryNumber: 1,
  image: '/photos/foto1.jpg',
  date: 'Un día inolvidable',
  location: 'Nuestro lugar favorito ✨',
  title: 'Risas sin parar',
  note: 'Celebrando y compartiendo momentos que quedan para siempre.',
  tag: 'Recuerdo Épico'
}
```

*Consejo:* Las fotos en formato vertical o cuadrado (4:3 o 1:1) se ven espectaculares en las tarjetas estilo Polaroid.
