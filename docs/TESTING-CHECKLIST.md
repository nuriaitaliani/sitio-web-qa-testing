# Testing Checklist

Esta checklist recoge las comprobaciones que voy a utilizar para decidir si un cambio está listo para integrarse en `main`.

Los criterios están basados en las pruebas que he realizado durante el proyecto y en herramientas que puedo utilizar de forma habitual.

---

## 1. Validación HTML

**Herramienta:** Nu HTML Checker / W3C Validator

Antes de dar por terminados los cambios en el HTML compruebo que:

- [ ] El documento tiene 0 errores.
- [ ] El documento tiene 0 avisos.
- [ ] La estructura semántica sigue siendo correcta.
- [ ] Las imágenes tienen texto alternativo cuando lo necesitan.
- [ ] Los campos del formulario tienen sus etiquetas asociadas.

**Criterio de aceptación:**  
El validador debe terminar con 0 errores y 0 avisos.

---

## 2. Accesibilidad

### WAVE

**Herramienta:** WAVE Evaluation Tool

Utilizo WAVE para detectar problemas que pueden pasar desapercibidos durante una revisión visual.

Compruebo que:

- [ ] No quedan errores de accesibilidad.
- [ ] No quedan alertas que necesiten corrección.
- [ ] Las imágenes relevantes tienen texto alternativo.
- [ ] Los encabezados mantienen un orden coherente.
- [ ] Los campos del formulario tienen etiquetas.

**Criterio de aceptación:**  
No deben quedar errores de accesibilidad pendientes de resolver.

---

### Contraste

**Herramientas:** WAVE, WebAIM Contrast Checker y Chrome DevTools

Cuando un cambio afecta a colores, texto, botones o estados de foco, compruebo el contraste en lugar de decidir únicamente a simple vista.

- [ ] El texto normal alcanza al menos `4.5:1`.
- [ ] Los enlaces alcanzan al menos `4.5:1` respecto a su fondo.
- [ ] El texto de los botones alcanza al menos `4.5:1`.
- [ ] El indicador de foco alcanza al menos `3:1` respecto al fondo.

Si el cambio afecta al modo oscuro, repito estas comprobaciones también con `prefers-color-scheme: dark`.

Un ejemplo real de este proyecto fue el indicador de foco en modo oscuro. Al medirlo inicialmente obtuve:

```text
1.68:1
```

por lo que no cumplía el mínimo de `3:1`.

Después de corregir el color, el nuevo resultado fue:

```text
5.77:1
```

y la prueba pasó correctamente.

---

### Navegación con teclado

También compruebo que el sitio pueda utilizarse sin depender únicamente del ratón.

- [ ] Los enlaces del menú pueden recorrerse con `Tab`.
- [ ] Los campos del formulario pueden recibir foco.
- [ ] Los botones pueden recibir foco.
- [ ] El indicador de foco se distingue claramente.
- [ ] El orden de navegación tiene sentido.

**Criterio de aceptación:**  
Todos los elementos interactivos deben poder alcanzarse con teclado y el foco debe ser visible.

---

## 3. Adaptación a diferentes tamaños de pantalla

**Herramienta:** Chrome DevTools - Device Toolbar

Pruebo el sitio al menos en estos tres anchos:

- [ ] `320 px`
- [ ] `768 px`
- [ ] `1440 px`

En cada uno compruebo que:

- [ ] No aparece desplazamiento horizontal.
- [ ] El contenido continúa siendo legible.
- [ ] Las tarjetas se adaptan correctamente.
- [ ] El formulario sigue siendo utilizable.
- [ ] El menú continúa funcionando correctamente.

Cuando necesito comprobar el desbordamiento de forma más precisa utilizo:

```javascript
document.documentElement.scrollWidth
document.documentElement.clientWidth
```

**Criterio de aceptación:**  
`scrollWidth` y `clientWidth` deben coincidir.

Si no coinciden, existe contenido que está saliendo del ancho disponible y hay que investigarlo.

---

### Tamaño de los botones

**Herramienta:** Chrome DevTools

Los botones del formulario deben mantener una altura mínima de `48 px`.

Compruebo:

- [ ] Botón `Enviar`: mínimo `48 px`.
- [ ] Botón `Limpiar`: mínimo `48 px`.

La altura puede medirse desde la consola:

```javascript
document.querySelector(".btn-primary").getBoundingClientRect().height
document.querySelector(".btn-secondary").getBoundingClientRect().height
```

**Criterio de aceptación:**  
Los botones deben mantener como mínimo `48 px` de altura.

Esta comprobación se añadió después de encontrar una regresión en la que el botón `Enviar` había pasado de `48 px` a `26 px`.

---

## 4. Rendimiento

**Herramienta:** Lighthouse de Chrome DevTools

Utilizo Lighthouse como una comprobación general del estado de la página.

Los valores mínimos que considero aceptables para este proyecto son:

- [ ] Performance: `>= 90`
- [ ] Accessibility: `>= 90`
- [ ] Best Practices: `>= 90`

**Criterio de aceptación:**  
Las tres categorías deben alcanzar como mínimo 90 puntos.

No exijo siempre una puntuación de 100 porque prefiero utilizar un umbral realista que pueda mantenerse cuando el proyecto cambie.

Si alguna categoría baja de 90, reviso el motivo antes de considerar terminado el cambio.

---

## 5. Formulario

**Herramienta:** pruebas manuales en Chrome

El formulario debe seguir funcionando correctamente después de cualquier cambio que pueda afectarlo.

### Campos obligatorios

Compruebo que:

- [ ] El campo `Nombre` no permita enviar el formulario vacío.
- [ ] El campo `Email` no permita enviar el formulario vacío.
- [ ] Los mensajes de validación sean comprensibles.

### Correo electrónico

Pruebo al menos:

- [ ] Un correo con formato válido.
- [ ] Un correo con formato incorrecto.
- [ ] El campo de correo vacío.

El comportamiento debe corresponder con la validación definida en el formulario.

### Botones

También compruebo que:

- [ ] `Enviar` ejecute correctamente la validación.
- [ ] `Limpiar` vacíe los campos.
- [ ] Ambos botones puedan utilizarse mediante teclado.

**Criterio de aceptación:**  
El formulario debe validar correctamente los campos obligatorios y el formato del correo, y debe poder utilizarse tanto con ratón como con teclado.

---

## 6. Git y GitHub

Las pruebas no son la única parte de la calidad. También quiero que el historial del proyecto sea fácil de entender y revisar.

Antes de fusionar una Pull Request compruebo que:

- [ ] El trabajo se ha realizado en una rama independiente.
- [ ] El nombre de la rama explica qué tipo de cambio contiene.
- [ ] Los commits tienen mensajes claros.
- [ ] El contenido de cada commit coincide con lo que dice su mensaje.
- [ ] La Pull Request explica qué se ha cambiado.
- [ ] Se han realizado las pruebas relacionadas con ese cambio.
- [ ] Los fallos encontrados durante la revisión se han corregido.
- [ ] Después de corregir un fallo se ha repetido la prueba.
- [ ] No hay conflictos pendientes con `main`.
- [ ] El cambio llega a `main` mediante Pull Request.

**Criterio de aceptación:**  
No considero terminado un cambio hasta que está probado, revisado y listo para integrarse en `main` de forma controlada.