# 🎵 Music Player SPA

Un reproductor de música moderno y elegante construido con React 19 y Vite. Permite reproducir archivos de audio locales con una interfaz intuitiva y características avanzadas.

![Music Player](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Características

- 🎵 **Reproducción de audio local** - Carga y reproduce archivos de música desde tu dispositivo
- 🖼️ **Extracción automática de metadatos** - Obtiene automáticamente título, artista, álbum y portada
- 🎨 **Interfaz moderna** - Diseño elegante con gradientes y animaciones suaves
- 📱 **Totalmente responsivo** - Optimizado para desktop, tablet y móvil
- 🎛️ **Controles completos** - Play, pause, siguiente, anterior, shuffle y repetición
- 🔊 **Control de volumen** - Slider de volumen con indicador visual
- 📊 **Barra de progreso interactiva** - Navega por la canción con un clic
- 💾 **Persistencia local** - Recuerda tu configuración entre sesiones
- 🚀 **Rendimiento optimizado** - Carga rápida y reproducción fluida

## 🛠️ Tecnologías

### Frontend
- **React 19** - Framework de UI con las últimas características
- **Vite 7** - Herramienta de build ultrarrápida
- **CSS Modules** - Estilos modulares y encapsulados
- **React Icons** - Iconografía moderna y consistente

### Audio Processing
- **music-metadata-browser** - Extracción de metadatos de archivos de audio
- **jsmediatags** - Procesamiento adicional de etiquetas de audio

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **SWC** - Compilador ultrarrápido
- **TypeScript** - Tipado estático (opcional)

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/music-player-SPA.git
cd music-player-SPA
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Ejecuta en modo desarrollo**
```bash
npm run dev
```

4. **Abre tu navegador**
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
src/
├── components/              # Componentes React
│   ├── Banner/             # Banner principal con info del álbum
│   │   ├── Banner.jsx
│   │   └── Banner.module.css
│   ├── Controls/           # Controles de reproducción
│   │   ├── Controls.jsx
│   │   └── Controls.module.css
│   ├── ProgressBar/        # Barra de progreso
│   │   ├── ProgressBar.jsx
│   │   └── ProgressBar.module.css
│   ├── BannerFile/         # Zona de carga de archivos
│   │   ├── BannerFile.jsx
│   │   └── BannerFile.module.css
│   └── shared/             # Componentes reutilizables
│       └── Button/
├── hooks/                  # Custom hooks
│   └── usePlaylist.js      # Hook principal para manejo de playlist
├── context/                # Context API
│   ├── PlaylistContext.jsx
│   └── usePlaylistContext.js
├── utils/                  # Utilidades
│   └── playlist/
│       └── operations.js   # Operaciones de archivos de audio
├── styles/                 # Estilos globales
│   ├── global.module.css
│   └── variables.module.css
├── App.jsx                 # Componente principal
└── main.jsx               # Punto de entrada
```

## 🎮 Uso

### Cargar música
1. **Arrastra y suelta** archivos de música en la zona de carga
2. **O haz clic** en la zona de carga para seleccionar archivos
3. **Selecciona una canción** de la lista para reproducir

### Controles de reproducción
- **▶️ Play/Pause** - Reproduce o pausa la canción actual
- **⏭️ Siguiente** - Avanza a la siguiente canción
- **⏮️ Anterior** - Retrocede a la canción anterior
- **🔀 Shuffle** - Reproduce las canciones en orden aleatorio
- **🔁 Repeat** - Repite la playlist o la canción actual

### Control de volumen
- **🔊 Slider de volumen** - Ajusta el volumen de reproducción
- **🔇 Mute** - Silencia o activa el sonido

### Navegación
- **📊 Barra de progreso** - Haz clic para saltar a cualquier parte de la canción
- **⏱️ Tiempo** - Muestra el tiempo actual y total de la canción

## 🚀 Despliegue

### Vercel (Recomendado)

1. **Conecta tu repositorio** con Vercel
2. **Configuración automática**:
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Despliega** con un clic

### Despliegue manual

```bash
# Build para producción
npm run build

# Vista previa local
npm run preview

# Despliegue con Vercel CLI
npx vercel
```

### Variables de entorno

No se requieren variables de entorno para el funcionamiento básico.

## 🔧 Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Vista previa del build
npm run lint         # Linting del código
npm run vercel-build # Build específico para Vercel
```

## 🎨 Personalización

### Temas y colores
Los colores se definen en `src/styles/variables.module.css`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --accent-color: #your-color;
}
```

### Componentes
Todos los componentes están en `src/components/` y usan CSS Modules para estilos encapsulados.

## 📱 Compatibilidad

### Navegadores soportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Formatos de audio soportados
- MP3
- WAV
- OGG
- M4A
- FLAC

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Joel Lertua C.** - [@JoelCoico25](https://github.com/JoelCoico25)

## 🙏 Agradecimientos

- [React](https://reactjs.org/) - Framework de UI
- [Vite](https://vitejs.dev/) - Herramienta de build
- [React Icons](https://react-icons.github.io/react-icons/) - Iconografía
- [music-metadata-browser](https://github.com/Borewit/music-metadata) - Extracción de metadatos

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor:

1. Revisa la [documentación](https://github.com/tu-usuario/music-player-SPA#readme)
2. Busca en [Issues existentes](https://github.com/tu-usuario/music-player-SPA/issues)
3. Crea un [nuevo Issue](https://github.com/tu-usuario/music-player-SPA/issues/new)

---

⭐ **¡Si te gusta este proyecto, dale una estrella!** ⭐