# Testing Results

## Prueba 1 - Validez del HTML

**Herramienta:** W3C Nu HTML Checker

**Resultado:**
- Errores: 0
- Avisos: 0

**Conclusión:** Prueba superada. El documento HTML cumple el criterio establecido de 0 errores.

## Prueba 2 - Accesibilidad con WAVE

**Herramienta:** WAVE Evaluation Tool

**Resultado:**
- Errores: 0
- Errores de contraste: 13
- Alertas: 0
- Features: 16
- Elementos estructurales: 17
- ARIA: 1
- AIM Score: 5.5/10

**Hallazgo de contraste:**
WAVE detectó 13 errores de contraste. Como ejemplo, el encabezado
"Bienvenido a QA Testing" presenta texto #111827 sobre fondo #1F2937,
con un ratio de contraste de 1.2:1.

- WCAG AA: Fail
- WCAG AAA: Fail

**Conclusión:** La prueba detecta un problema de accesibilidad relacionado
con el contraste. El hallazgo se analizará también en la prueba específica
de contraste.

## Prueba 3 - Adaptación a la pantalla

### 320 px

- Desplazamiento horizontal: Sí.
- `scrollWidth`: 365 px.
- `clientWidth`: 320 px.
- Desbordamiento horizontal: 45 px.
- Rejilla: una sola columna.
- Ancho real de la primera imagen: 300 px.
- Altura real del botón "Enviar": 48 px.
- Altura real del botón "Limpiar": 48 px.

**Hallazgo:** La página presenta desplazamiento horizontal a 320 px, por lo que parte del contenido excede el ancho del viewport.

### 768 px

- Desplazamiento horizontal: No.
- `scrollWidth`: 768 px.
- `clientWidth`: 768 px.
- Rejilla: dos columnas.
- Ancho real de la primera imagen: 300 px.
- Altura real del botón "Enviar": 48 px.
- Altura real del botón "Limpiar": 48 px.

**Conclusión:** A 768 px el contenido se adapta al ancho del viewport sin generar desplazamiento horizontal. La rejilla se reorganiza en dos columnas y los botones mantienen una altura de 48 px.

### 1440 px

- Desplazamiento horizontal: No.
- `scrollWidth`: 1440 px.
- `clientWidth`: 1440 px.
- Rejilla: tres columnas.
- Ancho real de la primera imagen: 300 px.
- Altura real del botón "Enviar": 48 px.
- Altura real del botón "Limpiar": 48 px.

**Conclusión:** A 1440 px el contenido se adapta correctamente al ancho del viewport sin desplazamiento horizontal. La rejilla se organiza en tres columnas y los botones mantienen una altura real de 48 px.

## Prueba 4 - Contraste

### Texto normal

- Ratio de contraste: 13.33:1
- Criterio mínimo: 4.5:1
- Resultado: Superado.

El texto normal presenta un contraste suficiente respecto a su fondo.

### Enlace

- Elemento medido: enlace "Ver código en GitHub".
- Color del texto: #2563EB.
- Ratio de contraste: 4.69:1.
- Criterio mínimo: 4.5:1.
- Resultado: Superado.

El enlace cumple el criterio mínimo de contraste, aunque el margen sobre el mínimo es reducido.

### Botón

- Elemento medido: botón "Enviar".
- Color del texto: #FFFFFF.
- Ratio de contraste: 5.16:1.
- Criterio mínimo: 4.5:1.
- Resultado: Superado.

El texto del botón presenta un contraste suficiente respecto a su color de fondo.

**Conclusión general:** Las tres combinaciones solicitadas superan el criterio mínimo de contraste: texto normal 13.33:1, enlace 4.69:1 y botón 5.16:1. Sin embargo, WAVE ha detectado otros 13 errores de contraste en elementos diferentes de la página, por lo que la accesibilidad global de contraste todavía presenta fallos.

## Prueba 5 - Navegación con teclado

**Método:** recorrido completo de la página utilizando únicamente la tecla Tab.

**Orden de navegación observado:**
1. Inicio
2. Features
3. Contacto
4. Sobre Nosotros
5. Nombre
6. Email
7. Mensaje
8. Enviar
9. Limpiar
10. Ver código en GitHub

**Indicadores de foco observados:**
- Enlaces de navegación: contorno azul visible.
- Campo Nombre: contorno azul visible.
- Campo Email: contorno azul visible.
- Campo Mensaje: contorno azul visible.
- Botón Enviar: contorno azul visible.
- Botón Limpiar: contorno azul visible.
- Enlace "Ver código en GitHub": contorno azul visible.

**Conclusión:** Prueba superada. Todos los elementos interactivos alcanzados mediante el tabulador presentan un indicador visual de foco claramente identificable. No se detectaron elementos interactivos sin indicador de foco.

## Prueba 6 - Lighthouse

**Herramienta:** Lighthouse de Chrome DevTools  
**Modo:** Desktop

**Resultados:**
- Performance: 100
- Accessibility: 96
- Best Practices: 100
- SEO: 100

**Conclusión:** La prueba supera los valores orientativos establecidos para accesibilidad y buenas prácticas. El rendimiento obtiene una puntuación de 100. La puntuación de accesibilidad de Lighthouse no elimina los problemas de contraste detectados previamente mediante WAVE y las comprobaciones manuales.