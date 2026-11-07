# Comparables del ACM público

Este doc dice dónde vive cada dato, cómo editarlo y de dónde salió.

## Qué archivo usa el sitio público

| Qué | Archivo | Notas |
|---|---|---|
| **Comparables** (propiedades, precios, fotos, pines) | `shared/comparableListings.ts`, objeto `COMPARABLE_LISTINGS` | Es TypeScript, no JSON. Es lo único que lee el sitio. |
| **Perfil del fraccionamiento** (perfil, mercado, precios de respaldo) | `shared/copy.ts`, `COPY.reveal.zona.profiles` | La línea de precios se calcula desde los comparables. El campo `precios` solo es respaldo. |
| **Candidatos y descartados** (investigación) | `docs/comparables-candidatos.json` | Solo para consulta. El sitio no lo lee. |

## Cuántos hay por fraccionamiento

| Fraccionamiento | Total | Casas | Terrenos | Deptos | EasyBroker | Lamudi | Rango de precio |
|---|---|---|---|---|---|---|---|
| Condado de Sayavedra | 8 | 5 | 3 | 0 | 8 | 0 | $3.8 a $14.6 MDP |
| Hacienda de Valle Escondido | 7 | 4 | 3 | 0 | 7 | 0 | $14.2 a $39.0 MDP |
| Rancho San Juan | 6 | 2 | 4 | 0 | 6 | 0 | $10.9 a $38.2 MDP |
| Bosque Real | 10 | 4 | 3 | 3 | 8 | 0 | $6.8 a $85.0 MDP |
| Club de Golf Chiluca | 7 | 7 | 0 | 0 | 4 | 3 | $10.8 a $18.0 MDP |
| Prado Largo | 6 | 6 | 0 | 0 | 3 | 3 | $15.5 a $27.0 MDP |
| Residencial Lago Esmeralda | 8 | 6 | 1 | 1 | 8 | 0 | $2.6 a $9.3 MDP |
| Lomas de Valle Escondido | 6 | 6 | 0 | 0 | 6 | 0 | $13.5 a $17.9 MDP |
| Bosque Esmeralda | 10 | 6 | 2 | 2 | 10 | 0 | $4.3 a $18.5 MDP |
| Club de Golf Valle Escondido | 6 | 6 | 0 | 0 | 3 | 3 | $20.5 a $45.5 MDP |
| Fincas de Sayavedra | 7 | 3 | 4 | 0 | 2 | 5 | $4.9 a $45.0 MDP |
| Interlomas y Hda. de las Palmas | 6 | 2 | 0 | 4 | 6 | 0 | $8.9 a $14.5 MDP |
| La Estadía | 6 | 3 | 3 | 0 | 6 | 0 | $7.0 a $26.3 MDP |

Regla: de **6 a 10** por fraccionamiento. La pantalla muestra solo los **6 primeros** de cada lista. Por eso el orden importa: las listas van ordenadas para que los primeros 6 mezclen tipos y precios representativos.

## Cómo agregar o cambiar un fraccionamiento

1. El nombre debe ser igual al de `ZONA_ESMERALDA_COLONIAS` o `ZONA_ESMERALDA_COLONIAS_EXTENDED` en `shared/validation.ts`.
2. Copia este bloque en `COMPARABLE_LISTINGS` y llénalo. Usa de 6 a 10 líneas.

```ts
'Nombre del fraccionamiento': [
  { tipo: 'Casa', precio: 0, m2: 0, recamaras: 0, banos: 0, photo: 'https://…', lat: 0, lng: 0, source: 'EasyBroker', sourceUrl: 'https://…' },
  { tipo: 'Terreno residencial', precio: 0, m2: 0, photo: 'https://…', lat: 0, lng: 0, source: 'Lamudi', sourceUrl: 'https://…' },
  { tipo: 'Departamento', precio: 0, m2: 0, recamaras: 0, banos: 0, photo: 'https://…', lat: 0, lng: 0, source: 'EasyBroker', sourceUrl: 'https://…' },
],
```

- `tipo`: `Casa`, `Departamento` o `Terreno residencial`.
- `m2`: m² de construcción. En un terreno, m² del lote.
- `photo`: la foto principal de la ficha. Si no hay, se muestra un ícono de casa.
- `lat` y `lng`: el pin. Los portales suelen dar el centro del fraccionamiento, no la casa.
- `source` y `sourceUrl`: de dónde salió, para poder revisarlo.
- Para el perfil de texto, agrega una entrada en `COPY.reveal.zona.profiles` (`shared/copy.ts`). Sin entrada, no se muestra el perfil.

## Reglas con las que se eligieron

- Hay dos tipos: **propiedades de Habitanza** (`own: true`, con `internalId` de Pulppo, fuente `Habitanza`) y de **otras agencias**. Las nuestras salen primero (`readyComparableListings` las ordena arriba), así que ocupan los 6 lugares visibles.
- Nuestras: solo **venta**, solo **Casa, Departamento y Terreno residencial**, solo **Estado de México**. Hoy: THU-827, CAY-069, CIU-841, DBT-278, DSI-514, TBQ-319, TMS-854.
- Pendientes (18 del Estado de México sin ficha completa): CNL-635, TAP-307, TXJ-575, TAZ-393, DXP-225, DHW-576, DAJ-081, CAX-089, DPU-066, DNI-817, DES-855, DLL-072, TNA-022, TVM-072, DFD-113, CBL-391, DPD-346, CVK-252. Falta m², pin y foto: `ver_propiedad` del MCP de Habitanza falla con `property_not_found`.
- La ficha existe hoy (no da 404) y trae precio, m² y coordenadas. Algunos enlaces (`easybroker.com/agent/...`) son de la cuenta de Habitanza en EasyBroker y piden iniciar sesión. El sitio no los muestra.
- Tiene al menos 5 fotos y la foto principal carga. El filtro de fotos es para que sean **fotos reales**, no por tamaño.
- En Lamudi, los m² de la lista y de la ficha deben coincidir.
- Sin duplicados: mismo tipo, precio dentro de 3% y m² dentro de 6%.
- Se quitaron los atípicos: precios por m² absurdos, terrenos de hectáreas y fichas de otra colonia.

## Cosas a tener en cuenta

- **Precios de oferta**, no de cierre. Cambian y las fichas se bajan. Hay que revisarlos antes de cada actualización.
- **Fotos de otras agencias.** Si una agencia pide que quitemos su foto, se borra la línea de ese comparable.
- Las fotos de EasyBroker pasan por `images.weserv.nl` para reducir su tamaño. Las de Lamudi ya vienen reducidas y se cargan directo (ese servicio no puede leerlas).
- Fincas de Sayavedra tiene terrenos de 2,000 a 5,000 m². Son grandes y bajan el precio por m².
- Un fraccionamiento que no está en la lista (`otra`) no tiene comparables. Aún no hay un promedio general para ese caso.

## De dónde salió esto

Se investigó en EasyBroker y Lamudi con Firecrawl el 2026-11-05 y 2026-11-06. Después se agregaron 8 comparables a mano, desde localhost (Condado de Sayavedra y Club de Golf Chiluca). Firecrawl consume créditos: **no se vuelve a usar** sin avisar. Para refrescar datos, edita a mano o pide una corrida específica.

`docs/comparables-candidatos.json` guarda cada ficha que se revisó: fuente, enlace, tipo, precio, m², fraccionamiento, si está **en uso** o **descartada** y el motivo.
