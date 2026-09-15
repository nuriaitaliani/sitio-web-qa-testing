# Branching Strategy

En este proyecto utilizo una estrategia de ramas sencilla para mantener `main` lo más estable posible y evitar mezclar cambios que todavía no están terminados.

La idea es que cada tarea tenga su propia rama, se revise y se pruebe antes de llegar a `main`.

---

## 1. Rama principal: `main`

`main` representa la versión estable e integrada del proyecto.

No trabajo directamente sobre esta rama.

Antes de empezar una tarea nueva, primero compruebo que mi copia local está actualizada:

```bash
git checkout main
git pull origin main
```

A partir de ahí creo una rama nueva según el tipo de cambio que vaya a realizar.

---

## 2. Ramas para nuevas funcionalidades o mejoras

Cuando quiero añadir una funcionalidad nueva o mejorar una parte del sitio utilizo ramas con el prefijo:

```text
feature/
```

El formato que sigo es:

```text
feature/nombre-del-cambio
```

Por ejemplo, durante este proyecto utilicé:

```text
feature/mejorar-accesibilidad
feature/modo-oscuro
```

Estas ramas se crean siempre desde una versión actualizada de `main`.

Por ejemplo:

```bash
git checkout main
git pull origin main
git checkout -b feature/modo-oscuro
```

Cuando termino el trabajo, pruebo los cambios y después abro una Pull Request hacia `main`.

---

## 3. Ramas para corregir errores

Cuando el objetivo de una rama es solucionar un fallo utilizo:

```text
fix/
```

El formato es:

```text
fix/nombre-del-error
```

Por ejemplo:

```text
fix/corregir-altura-botones
```

Esta sería la rama adecuada para corregir la regresión encontrada en la fase de `git bisect`.

En esa investigación descubrimos que el commit:

```text
b09b1ed Ajustes: espaciado de las tarjetas y de los botones tras la revision
```

había introducido:

```css
.btn {
  min-height: 0;
  padding: 4px 10px;
  font-size: 0.75rem;
}
```

y los botones pasaron de `48 px` a `26 px`.

Aunque el fallo ya esté localizado, la corrección tampoco debería hacerse directamente en `main`, sino en una rama específica como:

```text
fix/corregir-altura-botones
```

---

## 4. Ramas de documentación

Cuando los cambios afectan únicamente a documentación utilizo:

```text
docs/
```

El formato es:

```text
docs/nombre-documentacion
```

Por ejemplo:

```text
docs/manual-de-calidad
```

Esta es la rama que utilizaré para subir los documentos creados en esta fase:

```text
docs/TESTING-CHECKLIST.md
QA-WORKFLOW.md
docs/BRANCHING-STRATEGY.md
```

Aunque estos archivos no cambien el funcionamiento de la web, prefiero que sigan el mismo proceso que el resto del proyecto: rama, commit, Pull Request y revisión.

---

## 5. Cómo nombro las ramas

Intento que el nombre permita entender rápidamente qué se está haciendo sin tener que abrir los archivos.

Utilizo:

```text
feature/...
fix/...
docs/...
```

y después un nombre breve separado por guiones.

Ejemplos correctos:

```text
feature/modo-oscuro
feature/mejorar-accesibilidad
fix/corregir-altura-botones
docs/manual-de-calidad
```

Evito nombres demasiado genéricos como:

```text
cambios
pruebas
rama1
cosas
arreglos
```

porque cuando el repositorio crece dejan de aportar información útil.

---

## 6. Flujo que sigo con cada rama

Antes de empezar:

```bash
git checkout main
git pull origin main
```

Después creo la rama:

```bash
git checkout -b tipo/nombre-del-cambio
```

Trabajo en ella y reviso lo que he modificado:

```bash
git status
git diff
```

Cuando el cambio está listo:

```bash
git add archivo
git commit -m "Mensaje descriptivo"
```

Después lo subo a GitHub:

```bash
git push origin tipo/nombre-del-cambio
```

y abro una Pull Request hacia `main`.

Antes de fusionarla realizo las pruebas que correspondan según `docs/TESTING-CHECKLIST.md`.

---

## 7. Pull Requests

Todo cambio debería llegar a `main` mediante una Pull Request.

La Pull Request me sirve para dejar constancia de:

- qué he cambiado;
- por qué lo he cambiado;
- qué pruebas he realizado;
- y si durante la revisión apareció algún problema.

Si encuentro un fallo, primero lo documento y lo corrijo.

Después repito la prueba que permitió detectarlo.

Solo cuando el resultado es correcto considero que la propuesta está lista para fusionarse.

---

## 8. Integración en `main`

Cuando una Pull Request ya está revisada y las pruebas han pasado, se puede fusionar.

En este proyecto he utilizado:

```text
Create a merge commit
```

cuando me interesaba conservar los commits individuales.

Esto resultó útil más adelante, porque durante la fase de `git bisect` pudimos recorrer el historial y localizar exactamente qué commit había introducido la regresión.

Después de fusionar vuelvo a actualizar mi copia local:

```bash
git checkout main
git pull origin main
```

y compruebo el estado:

```bash
git status
git log --oneline
```

---

## 9. Commits

Intento que cada commit represente un cambio concreto y que el mensaje explique realmente lo que contiene.

Por ejemplo:

```text
Accesibilidad: mejorar la semantica del HTML y el contraste
```

```text
Modo oscuro: fondo y menu adaptados al tema del sistema
```

```text
Accesibilidad: corregir contraste del foco en modo oscuro
```

Durante este proyecto también encontré un ejemplo de lo que quiero evitar.

El commit:

```text
Ajustes: espaciado de las tarjetas y de los botones tras la revision
```

parecía indicar únicamente cambios de espaciado, pero incluía también modificaciones en:

```text
min-height
font-size
```

Una de ellas terminó provocando la regresión del tamaño de los botones.

Por eso intento que el contenido del commit y su mensaje sean coherentes entre sí.

---

## 10. Etiquetas de versión

No necesito crear una etiqueta por cada cambio.

Las etiquetas las reservaría para momentos en los que exista una versión estable y reconocible del proyecto en `main`.

Antes de etiquetar una versión deberían cumplirse estas condiciones:

- las Pull Requests necesarias están fusionadas;
- las pruebas correspondientes han pasado;
- no hay fallos conocidos que impidan considerar estable esa versión;
- el estado de `main` representa una versión que merece conservarse como referencia.

El formato que utilizaría sería:

```text
vMAJOR.MINOR.PATCH
```

Por ejemplo:

```text
v1.0.0
```

La idea sería:

```text
PATCH -> correcciones
MINOR -> nuevas funcionalidades compatibles
MAJOR -> cambios importantes o incompatibles
```

Ejemplos:

```text
v1.0.0
v1.0.1
v1.1.0
v2.0.0
```

Una etiqueta podría crearse con:

```bash
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

Las etiquetas se crearían sobre una versión estable ya integrada en `main`, no desde una rama `feature`, `fix` o `docs`.

---

## 11. Resumen

La estrategia que sigo en este proyecto se puede resumir así:

| Tipo de trabajo | Rama | Ejemplo |
|---|---|---|
| Versión estable | `main` | `main` |
| Nueva funcionalidad o mejora | `feature/...` | `feature/modo-oscuro` |
| Corrección de un fallo | `fix/...` | `fix/corregir-altura-botones` |
| Documentación | `docs/...` | `docs/manual-de-calidad` |

La regla principal es:

```text
No trabajar directamente sobre main.
```

El flujo habitual es:

```text
main
  ↓
rama independiente
  ↓
cambios
  ↓
pruebas
  ↓
commit
  ↓
push
  ↓
Pull Request
  ↓
revisión
  ↓
merge
  ↓
main
```