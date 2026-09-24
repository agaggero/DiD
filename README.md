# IV Jornadas Metodológicas — Enfoques Modernos de Difference‑in‑Differences

Micrositio web del programa + cartel actualizado + generador de código QR para la
**IV Jornada Metodológica y Multidisciplinar en Métodos Cuantitativos** (FCCEE, Universidad de Granada · 10 nov 2026), con la **Dra. Lídia Farré** (IAE‑CSIC · Barcelona School of Economics).

La idea: **el cartel es la invitación** y **la web es el programa completo** que se descubre al escanear el QR. Ambos comparten identidad (fondo blanco + colores corporativos de la FCCEE: naranja `#f39200`, magenta/granate `#b61760`).

---

## 1. Archivos creados / modificados

| Archivo | Qué es |
|---|---|
| **`index.html`** | Micrositio del programa (una sola página, HTML+CSS, JS mínimo). Autónomo salvo los assets de `/assets`. |
| `assets/lidia-farre.jpg` | Foto de la ponente (optimizada). |
| `assets/logo-fccee.png`, `assets/logo-ugr.svg`, `assets/logo-dmc.png` | Logotipos oficiales (FCCEE y UGR descargados de fccee.ugr.es; UGR recoloreado a negro para fondo blanco). |
| `assets/favicon.svg` | Favicon (una “Δ”, por *Difference*). |
| `assets/og-image.png` | Imagen para compartir en redes/WhatsApp (1200×630). |
| `assets/programa-qr-placeholder.png` | Marcador del QR (se sustituye por el QR real). |
| **`flyer/IV_Jornadas_DiD_flyer.pptx`** | **Cartel actualizado, editable y con el QR real** (PowerPoint). El original queda intacto en `professor_flyer_improved_v3 (1).pptx`. |
| `flyer/vista-previa-cartel.html` | Vista previa del cartel en el navegador (aproximada; la fuente real es el `.pptx`). |
| `scripts/generate-qr.mjs` | Genera el QR (SVG+PNG) hacia la URL pública y verifica que lo codifica bien. |
| `package.json` | Declara la dependencia `qrcode` para el script del QR. |
| `Memoria_Jornada_DiD.docx` | (Sin cambios) Fuente de la información académica. |

---

## 2. Previsualizar en local

- **La web:** abre `index.html` con doble clic. (Para que carguen bien fuentes/assets como en producción, puedes servirla: `npx serve` en esta carpeta y abre la URL que indique.)
- **El cartel:** abre `flyer/IV_Jornadas_DiD_flyer.pptx` en PowerPoint / LibreOffice / Google Slides. Para un vistazo rápido sin PowerPoint, abre `flyer/vista-previa-cartel.html`.

**Vista previa privada online (solo tú puedes abrirla, requiere tu sesión de Claude):**
https://claude.ai/artifact/RGwAaBFxXJiwL6gGAZyC2J
*(No sirve como destino del QR: da error 403 a quien no haya iniciado sesión.)*

---

## 3. Desplegar la web (GitHub Pages)

> El repositorio local **ya está preparado** con un commit inicial (rama `main`).
> La *memoria* y `node_modules` están **excluidos** (`.gitignore`) para que **no** se publiquen.

1. Crea en GitHub un repositorio **público** y **vacío** (sin README ni .gitignore) llamado exactamente **`DiD`** → https://github.com/new
2. Desde esta carpeta, enlázalo y súbelo:
   ```bash
   git remote add origin https://github.com/agaggero/DiD.git
   git push -u origin main
   ```
   *(La primera vez, Git abrirá el navegador para iniciar sesión en GitHub.)*
3. En el repo: **Settings → Pages → Source: “Deploy from a branch” → `main` / `(root)` → Save**.
4. En ~1 minuto la web estará en **`https://agaggero.github.io/DiD/`** — justo lo que codifica el QR.

*(Alternativa sin git: en el repo vacío pulsa “uploading an existing file” y arrastra todo **menos** `node_modules/` y `Memoria_Jornada_DiD.docx`. Otra opción distinta: arrastrar la carpeta a https://app.netlify.com/drop, pero la URL cambiaría y habría que regenerar el QR.)*

---

## 4. Estado — qué queda por rellenar

### a) Enlace del formulario de inscripción (Google Form)
Todavía no existe. En **`index.html`**, busca al final:
```js
var FORM_URL = "";   // ← pega aquí el enlace del Google Form cuando lo tengas
```
Con `""`, los botones muestran **“Inscripción (próximamente)”**. Al pegar la URL, todos los botones se activan solos.
En el **cartel**, el texto dice “formulario disponible próximamente”; se edita en PowerPoint.

### b) URL pública y código QR — ✅ ya generado e integrado
El QR ya apunta a **`https://agaggero.github.io/DiD/`** (`assets/programa-qr.svg` + `assets/programa-qr.png`, verificado por decodificación) y **ya está incrustado en el cartel**. La URL también está fijada en `index.html` (`og:url` y `canonical`).

👉 **Solo falta que publiques la web en esa URL** (paso 3). Importante: el repositorio debe llamarse **`DiD`** (con esas mayúsculas exactas) para que la URL coincida con el QR.

Si en el futuro cambia la URL, regenera el QR y vuelve a colocarlo en el cartel:
```bash
npm install                              # una sola vez
node scripts/generate-qr.mjs "https://NUEVA-URL/"
```
y en PowerPoint: clic derecho sobre el QR → “Cambiar imagen” → `assets/programa-qr.png`.

---

## 5. Qué apunta el QR (resumen)

- **Destino:** `https://agaggero.github.io/DiD/`
- **Estado:** ✅ QR generado, **verificado por decodificación** e **integrado en el cartel**; URL fijada en la web. Solo queda **publicar la web** en GitHub Pages (paso 3, repositorio `DiD`).

---

## 6. Correcciones aplicadas al cartel

- ✅ **“IV Jornadas”** (no “VI”) — también corregido en las propiedades del archivo (`docProps`).
- ✅ **Facultad de Ciencias Económicas y Empresariales** (nombre completo, no abreviado).
- ✅ **“Economía Aplicada”** con tilde.
- ✅ Nombre de la ponente → **“Dra. Lídia Farré”** (con tildes; alineado con la *memoria*).
- ⚠️ **Cargo de la ponente:** el cartel decía *“Catedrática de Universidad”*, que **la memoria contradice**. Lo he sustituido por su afiliación real (fuente: memoria): **Tenured Scientist · IAE‑CSIC / Barcelona School of Economics / Economía Aplicada**. Revísalo por si prefieres otra redacción.
- ✅ Enlace de inscripción → marcador “próximamente” (aún no hay formulario).
- ✅ Área **“Programa completo”** rediseñada como módulo de QR, con el **código QR real** (→ `agaggero.github.io/DiD`) integrado.
- ✅ Paleta afinada a los colores exactos de la FCCEE (naranja `#f39200`, granate `#b61760`); se conservó el diseño y la composición (refinar, no rehacer).

---

## 7. Suposiciones

- **Programa en 2 bloques + 1 pausa:** la memoria detallaba 4 subbloques (TWFE/Goodman‑Bacon → Callaway‑Sant’Anna → Sun‑Abraham/event‑study → Group Fixed Effects) con dos pausas. Reorganizado, agrupando por sentido pedagógico, en:
  **Bloque 1 · Diagnóstico: el TWFE y sus límites** (10:00–11:30) → **café** (11:30–12:00) → **Bloque 2 · La nueva generación de estimadores DiD robustos** (12:00–14:00). La memoria daba horario “tentativo”; se situó la única pausa en el ecuador de la mañana (mínima suposición razonable).
- **Sede:** “Aula D11, FCCEE” (el aula D11 viene del cartel; la memoria solo dice “aula de la FCCEE”).
- **Nombre/cargo de la ponente** alineados con la *memoria* como fuente de verdad (ver §6).
- **Logos:** en la web se usan los oficiales (limpios, sobre blanco). En el cartel se conservaron los logos originales del `.pptx` (para no alterar la composición); si quieres, se pueden sustituir por los oficiales de `/assets`.
- No se han inventado datos: presupuesto, financiación interna y teléfonos de la memoria se han omitido por ser información interna.

---

## 8. Notas técnicas

- La web está bloqueada en tema claro (fondo blanco) según lo pedido; el CSS de tema oscuro se conserva desactivado por si algún día se quiere.
- Accesibilidad: HTML semántico, buen contraste, foco visible, `prefers-reduced-motion`, datos estructurados (schema.org `EducationEvent`), metadatos Open Graph/Twitter.
- Sin librerías pesadas: solo dos fuentes de Google (Fraunces + Inter) y CSS/JS propios. Optimizada para móvil (escaneo del QR).

🤖 Generated with [claude-flow](https://github.com/ruvnet/claude-flow)
