# QA Workflow

Este documento recoge la forma de trabajo que seguimos en este proyecto para revisar cambios antes de incorporarlos a `main`.

La idea es sencilla: cada cambio se hace en su propia rama, se prueba, se revisa y solo se fusiona cuando tenemos suficiente confianza en que funciona correctamente y no introduce problemas nuevos.

Las comprobaciones concretas que utilizamos están recogidas en `docs/TESTING-CHECKLIST.md`.

---

## 1. Empezar siempre desde una versión actualizada

Antes de comenzar un cambio nuevo, primero vuelvo a `main` y compruebo que tengo la versión más reciente del repositorio:

```bash
git checkout main
git pull origin main
```

A partir de ahí creo una rama nueva para trabajar.

Por ejemplo:

```bash
git checkout -b feature/modo-oscuro
```

De esta forma los cambios quedan separados de `main` hasta que estén terminados y revisados.

---

## 2. Trabajar y revisar los cambios antes de subirlos

Mientras trabajo en una rama utilizo:

```bash
git status
```

para comprobar qué archivos he modificado.

También puedo revisar exactamente qué ha cambiado con:

```bash
git diff
```

Esto es útil antes de hacer un commit porque permite detectar modificaciones accidentales o cambios que no deberían formar parte de ese commit.

Cuando el cambio está listo, ejecuto las pruebas que correspondan según `docs/TESTING-CHECKLIST.md`.

No siempre es necesario repetir absolutamente todas las pruebas, pero sí aquellas relacionadas con la parte del sitio que se ha modificado.

Por ejemplo, si cambio colores o estilos, tendría sentido volver a comprobar contraste, foco y modo oscuro. Si modifico el formulario, tendría que revisar sus validaciones y el funcionamiento de sus botones.

---

## 3. Crear commits que expliquen bien lo que contienen

Cuando el cambio ya está probado, añado los archivos necesarios y creo el commit.

Por ejemplo:

```bash
git add style.css
git commit -m "Accesibilidad: corregir contraste del foco en modo oscuro"
```

Intento que el mensaje diga realmente qué se ha cambiado.

Esto parece un detalle pequeño, pero durante este proyecto vimos por qué importa.

El commit:

```text
Ajustes: espaciado de las tarjetas y de los botones tras la revision
```

no modificaba únicamente espaciado. También incluía cambios en `min-height` y `font-size`.

Uno de esos cambios terminó provocando la regresión del tamaño de los botones.

Por eso un commit debería contener cambios relacionados entre sí y su mensaje debería describirlos con suficiente precisión.

---

## 4. Subir la rama y abrir una Pull Request

Cuando la rama está lista, la subo a GitHub.

Por ejemplo:

```bash
git push origin feature/modo-oscuro
```

Después abro una Pull Request hacia `main`.

La descripción debe dejar claro qué se ha cambiado, por qué se ha hecho y qué pruebas se han realizado.

La Pull Request no sirve únicamente para fusionar código. También es el lugar donde queda registrada la revisión.

---

## 5. Cómo probar una rama de una Pull Request

Antes de aprobar una propuesta hay que probarla.

Primero actualizo la información del repositorio remoto:

```bash
git fetch origin
```

Si la rama ya existe en local:

```bash
git checkout nombre-de-la-rama
```

Si todavía no existe:

```bash
git checkout -b nombre-de-la-rama origin/nombre-de-la-rama
```

Una vez dentro de la rama, levanto el sitio y realizo las comprobaciones que correspondan.

En este proyecto he utilizado principalmente Chrome y Chrome DevTools para revisar el comportamiento del sitio, junto con herramientas como WAVE, Lighthouse, Nu HTML Checker y WebAIM Contrast Checker.

La revisión no consiste solamente en mirar si la página “parece estar bien”. Siempre que sea posible intento utilizar valores medibles.

---

## 6. Qué hago si encuentro un fallo

Si durante la revisión aparece un problema, no fusiono la Pull Request directamente.

Primero intento reproducirlo y anoto:

- cómo se reproduce;
- qué esperaba que ocurriera;
- qué ocurrió realmente;
- qué evidencia tengo;
- y, si es posible, qué cambio podría solucionarlo.

Después dejo constancia del hallazgo en la Pull Request.

Cuando otra persona revisa una propuesta se puede utilizar `Request changes`.

En este proyecto las Pull Requests estaban creadas desde mi propia cuenta, así que GitHub no me permitía solicitar cambios formalmente sobre mi propia propuesta. En esos casos dejé el fallo documentado mediante un comentario de revisión antes de corregirlo.

Lo importante es mantener el mismo proceso:

1. encontrar el problema;
2. documentarlo;
3. corregirlo;
4. volver a probarlo;
5. fusionar solo cuando la nueva prueba confirme que está solucionado.

---

## 7. Caso real: indicador de foco en modo oscuro

Un ejemplo real de este flujo ocurrió con la rama:

```text
feature/modo-oscuro
```

Al probar la navegación mediante teclado en modo oscuro, el indicador de foco seguía siendo visible, así que visualmente podía parecer correcto.

Sin embargo, al medirlo encontramos:

```text
Color del contorno: #1E40AF
Color del fondo: #1F2937
Contraste: 1.68:1
```

El mínimo que estábamos utilizando para el indicador de foco era:

```text
3:1
```

Por tanto, la prueba falló.

En la Pull Request se documentó el problema y se propuso utilizar un color más claro:

```text
#60A5FA
```

Después de hacer el cambio se volvió a medir:

```text
Contraste nuevo: 5.77:1
```

Esta vez el resultado sí superaba el mínimo establecido.

La corrección quedó registrada en:

```text
31f868a Accesibilidad: corregir contraste del foco en modo oscuro
```

Este caso fue útil porque demostró que una comprobación visual no siempre es suficiente. El foco se veía, pero la medición mostraba que su contraste era demasiado bajo.

---

## 8. Verificar una corrección

Cuando se corrige un fallo, no doy por hecho que el problema está resuelto solamente porque el código haya cambiado.

Repito la misma prueba que permitió encontrarlo.

En el caso anterior:

```text
Antes: 1.68:1 -> FAIL
Después: 5.77:1 -> PASS
```

Solo después de comprobar el nuevo resultado considero que el fallo está corregido.

---

## 9. Fusionar la Pull Request

Cuando las pruebas han terminado y los fallos encontrados están resueltos, la Pull Request puede fusionarse.

En este proyecto hemos utilizado:

```text
Create a merge commit
```

cuando queríamos conservar cada commit del historial.

Esto fue especialmente útil más adelante, porque permitió utilizar `git bisect` para investigar una regresión y localizar exactamente qué commit la había introducido.

---

## 10. Qué hago después de fusionar

Después de fusionar una Pull Request vuelvo siempre a `main` y actualizo mi copia local:

```bash
git checkout main
git pull origin main
```

Después compruebo que todo está en orden:

```bash
git status
git log --oneline
```

Así confirmo que estoy trabajando sobre la versión más reciente antes de empezar una tarea nueva.

También hago una comprobación básica del sitio después del merge para asegurarme de que la integración no ha introducido ningún problema evidente.

---

## 11. Cuando aparece una regresión

Si algo funcionaba correctamente y deja de hacerlo después de varios commits, revisarlos uno por uno puede ser lento.

En este proyecto utilizamos `git bisect` cuando detectamos que los botones del formulario, que debían medir `48 px`, estaban midiendo solo `26 px`.

Antes de empezar fijamos un criterio objetivo:

```text
Más de 40 px -> GOOD
Menos de 30 px -> BAD
```

Después iniciamos la búsqueda:

```bash
git bisect start
git bisect bad main
git bisect good 59f8b3e
```

En cada parada se medía de nuevo la altura del botón y se indicaba a Git:

```bash
git bisect good
```

o:

```bash
git bisect bad
```

Después de tres comprobaciones, Git identificó como primer commit defectuoso:

```text
b09b1ed Ajustes: espaciado de las tarjetas y de los botones tras la revision
```

Para ver qué había cambiado exactamente utilizamos:

```bash
git show b09b1ed -- style.css
```

Ahí apareció esta regla:

```css
.btn {
  min-height: 0;
  padding: 4px 10px;
  font-size: 0.75rem;
}
```

La nueva declaración `min-height: 0` estaba anulando el `min-height: 48px` definido anteriormente.

Al terminar la investigación salimos del modo bisect con:

```bash
git bisect reset
```

Este caso demuestra por qué es útil conservar un historial claro y commits bien separados.

---

## 12. Resumen del flujo de trabajo

En este proyecto intento mantener siempre el mismo proceso:

1. actualizar `main`;
2. crear una rama para el cambio;
3. trabajar y revisar lo modificado;
4. ejecutar las pruebas necesarias;
5. crear commits claros;
6. subir la rama y abrir una Pull Request;
7. probar la propuesta;
8. documentar cualquier fallo encontrado;
9. corregirlo y repetir la prueba;
10. fusionar solo cuando el resultado sea correcto;
11. volver a `main` y actualizar la copia local.

El objetivo no es únicamente encontrar errores, sino dejar suficiente evidencia para entender qué se ha probado, qué ha fallado y por qué podemos considerar seguro un cambio antes de incorporarlo a `main`.