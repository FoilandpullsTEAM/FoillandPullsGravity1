# Cómo cambiar este sitio

Este documento está escrito para vos, que querés personalizar tu sitio web de manera sencilla y rápida usando un asistente de inteligencia artificial o haciendo pequeñas modificaciones vos mismo, sin necesidad de saber programar.

---

## Antes que nada: cómo verlo corriendo

Para ver el sitio funcionando en tu computadora localmente, solo necesitás una terminal (la aplicación de consola de tu computadora):

1. **Instalar los componentes necesarios**: escribí el siguiente comando y apretá Enter:
   ```bash
   npm install
   ```
2. **Encender el servidor de prueba**: una vez que termine la instalación, escribí:
   ```bash
   npm run dev
   ```
3. Abrí tu navegador de internet (como Chrome o Safari) y entrá a la dirección `http://localhost:3000`. ¡Listo! Vas a ver tu página funcionando con todas sus animaciones fluidas. Para apagarlo, apretás las teclas `Ctrl + C` en tu terminal.

---

## Los dos únicos archivos que tenés que tocar

No necesitás navegar por decenas de carpetas ni tocar código complejo. Todo lo que podés querer personalizar vive en estos dos lugares:

| Archivo | ¿Para qué sirve? |
| :--- | :--- |
| `src/lib/content.ts` | **Absolutamente todo el contenido**: los textos de cada sección, los títulos, los lemas, las fotos, los videos y los fondos de pantalla. |
| `src/index.css` | **La apariencia visual**: los colores principales de la marca, los tonos de acento y las fuentes tipográficas. |

*Nota sobre las secciones*: Si querés activar, apagar o cambiar el orden de las secciones de la página (por ejemplo, poner testimonios antes de clases), se hace en `src/sections.ts` cambiando simplemente `active: true` o `active: false`.

---

## Las 3 cosas que vas a querer cambiar

### 1. Cambiar una imagen o fondo
En `src/lib/content.ts`, buscá la sección `MEDIA` arriba de todo. Por ejemplo, para cambiar la foto de la bailarina por tu propia imagen, solo reemplazás la dirección entre comillas:
```ts
dancer: "https://miservidor.com/mi-propia-foto.webp",
```
Para cambiar el fondo del Hero por una foto propia en vez del cielo degradado, buscás `BACKGROUNDS` en ese mismo archivo y cambiás:
```ts
hero: [{ type: "image", src: "https://miservidor.com/mi-fondo.jpg" }],
```

### 2. Cambiar un texto
En `src/lib/content.ts`, buscá el bloque `/* 3. TEXTOS */`. Cada sección tiene su nombre bien claro (`HERO`, `MANIFESTO`, `CLASSES`, `INSTRUCTORS`, `TESTIMONIALS`, `PLANS`, etc.).
Por ejemplo, para cambiar el lema de la marca:
```ts
tagline: [
  ["Desafiá", "la Gravedad."],
  ["Dominá", "el Baile."],
],
```

### 3. Cambiar un color de marca
En `src/index.css`, buscás el bloque `@theme` arriba de todo. Podés cambiar el color primario celeste (`--color-sky`) o el azul intenso (`--color-deep`):
```css
--color-sky: #8ab4f8;   /* Tu nuevo color celeste */
--color-deep: #1a73e8;  /* Tu nuevo color azul */
```

---

## Comandos listos para copiar y pegar

Cuando le pidas cambios a un asistente de IA, copiá y pegá cualquiera de estas 10 frases exactas:

1. *"Cambiá el fondo del hero por esta imagen: `<dirección de tu imagen>`"*
2. *"Cambiá el color de acento del sitio a `<código de color o nombre>`"*
3. *"Sacá la sección de `instructors` poniendo su estado en inactivo."*
4. *"Poné la sección de `community` antes de la de `classes` en la lista de secciones."*
5. *"Modificá los precios de los planes de membresía en `content.ts`: Drop-in a 35€, Flow a 79€ y Air a 130€."*
6. *"Cambiá los testimonios de los alumnos en `content.ts` por estos nuevos textos: `<tus testimonios>`"*
7. *"Actualizá la lista de clases con nuevos nombres, duraciones y descripciones en `content.ts`."*
8. *"Cambiá los enlaces de redes sociales del pie de página y cabecera por mis perfiles reales."*
9. *"Reemplazá las fotos de los profesores por esta lista de retratos: `<enlaces de fotos>`"*
10. *"Modificá los textos del manifiesto y los tres pilares del método de baile por estos: `<tus textos>`"*

> **Frase clave para orientar a la IA**:
> "Todo el contenido está en `src/lib/content.ts`. Los colores y las tipografías, en `src/index.css`. Las secciones, en `src/sections.ts`. No edites los componentes para cambiar contenido."

---

## Lo que NO es fácil en este sitio

Hay tres elementos en este diseño que están construidos con un nivel milimétrico de precisión técnica y no pueden cambiarse con una sola frase genérica. Acá te explicamos qué son, por qué están hechos así, y cuál es el comando de rescate para modificarlos sin romper la página:

### 1. El gran título del Hero ("PRO / GRAVITY")
- **Qué es y por qué está así**: No es un texto común alineado al centro. Son cinco piezas independientes (`Pr`, el anillo blanco que forma la `O`, la palabra difuminada `Gravi`, una barra blanca y la terminación nítida `ty`) ubicadas con coordenadas exactas de diseño para que el cuerpo de la bailarina pase por detrás del anillo pero su cabeza quede por delante.
- **Comando de rescate**:
  *"Reemplazá el título partido del hero por un solo título centrado que lea `HERO.brand`, y borrá el anillo, la barra blanca y el recorte frontal de la bailarina."*
- **Costo**: El efecto tridimensional del anillo con la bailarina flotando por delante desaparece y se convierte en un título tradicional centrado; el resto de la página queda intacto.

### 2. La variable `--color-sky` cumple dos funciones simultáneas
- **Qué es y por qué está así**: Representa tanto el tono celeste de fondo del Hero como el color del resplandor y la sombra interior que le da volumen al anillo de la "O". Si cambiás `--color-sky` para poner un fondo rojo o verde, la sombra interior del anillo también cambiará a ese color.
- **Comando de rescate**:
  *"Cambiá `--color-sky` solo como fondo del hero. Creá un token nuevo para la sombra interior del anillo de la 'O' y dejale el valor celeste que tenía."*
- **Costo**: Ninguno, pero requiere crear una variable específica para separar ambos roles.

### 3. Las posiciones del Hero son coordenadas fijas de lienzo
- **Qué es y por qué está así**: A diferencia del resto de la página que fluye de arriba abajo de forma automática, el Hero de escritorio y celular está construido como un marco de diseño puro (1440x810 en PC y 440x956 en móvil). *Qué* se muestra (fotos, textos, números) se cambia al instante; pero *dónde* está colocado cada fragmento depende de su posición fija en ese lienzo.
- **Comando de rescate**: Para mover elementos de lugar en el Hero, pedile a la IA que ajuste los valores `left`, `top`, `dw()` o `mw()` en `HeroDesktop.tsx` o `HeroMobile.tsx`.

---

## Si algo se rompe

Si tocaste un archivo y la página muestra una pantalla de error o no carga:

1. **Deshacer el cambio**: En tu editor presioná `Ctrl + Z` (o `Cmd + Z` en Mac) para volver al estado anterior.
2. **Revisar comas y comillas**: El 90% de los errores al editar texto ocurren por borrar sin querer una comilla de cierre (`"`) o una coma (`,`) al final de una línea.
3. **Leé el mensaje de la terminal**: Si la consola muestra texto en rojo, copiá todo ese bloque de texto.
4. **Pegale el error a la IA**: Decile *"Me apareció este error al editar `content.ts`: `<pegá acá el mensaje>`"*. La IA te dirá exactamente qué comilla o coma falta corregir.
