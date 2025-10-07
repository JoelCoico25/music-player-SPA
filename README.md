# Music Player - React + Vite + SWC

Proyecto de reproductor de música creado con React.js, Vite y SWC como compilador.

## 🚀 Tecnologías

- **React 19.1.1** - Biblioteca de JavaScript para interfaces de usuario
- **Vite 7.1.7** - Build tool y servidor de desarrollo rápido
- **SWC** - Compilador ultrarrápido escrito en Rust
- **JavaScript** - Lenguaje de programación

## 📁 Estructura del Proyecto

```
src/
├── assets/         # Recursos estáticos (imágenes, fuentes, etc.)
├── components/     # Componentes reutilizables
├── pages/          # Páginas de la aplicación
├── hooks/          # Custom hooks
├── utils/          # Funciones utilitarias
├── services/       # Servicios y llamadas a APIs
├── styles/         # Archivos de estilos
├── contexts/       # Context providers
├── constants/      # Constantes de la aplicación
└── ...
```

## 🔗 Aliases Configurados

El proyecto incluye los siguientes aliases para importaciones más limpias:

- `@` → `./src`
- `@components` → `./src/components`
- `@pages` → `./src/pages`
- `@hooks` → `./src/hooks`
- `@utils` → `./src/utils`
- `@services` → `./src/services`
- `@assets` → `./src/assets`
- `@styles` → `./src/styles`
- `@contexts` → `./src/contexts`
- `@constants` → `./src/constants`

### Ejemplo de uso:
```javascript
// En lugar de:
import Button from '../../../../components/Button'

// Usa:
import Button from '@components/Button'
```

## 🛠️ Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linting
npm run lint
```

## 💡 Notas

- Este proyecto fue creado con la plantilla `react-swc` de Vite
- Se usa SWC en lugar de Babel para un rendimiento superior
- Los aliases están configurados en `vite.config.js`
- Gestión de paquetes: se recomienda usar npm debido a problemas de compatibilidad entre Bun y Vite

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
