# Prompt para Codex en Visual Studio

Quiero que construyas una aplicacion movil-first para iPhone llamada `NeuroHabitos`. Debe quedar guardada como proyecto completo en una carpeta local con todo el codigo, lista para abrirse en Visual Studio Code y ejecutarse desde el primer momento. Quiero que te encargues de toda la implementacion tecnica, estructura de carpetas, componentes, estilos, estado, persistencia, validaciones, logica de recordatorios simulados, analitica local y documentacion de arranque. Toma como referencia el nivel de autonomia, orden y acabado de una app previa que hicimos sobre la Biblia: misma sensacion de proyecto serio, bien estructurado, visualmente trabajado y funcional desde la primera ejecucion, pero esta aplicacion es totalmente distinta en concepto, diseño y funcionalidades.

## Objetivo del producto

La app esta pensada para usarse siempre desde un iPhone. El caso de uso principal es ayudar a una persona a crear, seguir, entender y mejorar sus habitos diarios, no solo marcando si los cumple o no, sino analizando como un habito impacta en otros a nivel de energia, claridad mental, friccion, constancia y rendimiento. El diferenciador principal es una capa de neurociencia aplicada y explicada de forma clara para consumidor final.

## Enfoque de plataforma

- Prioriza una experiencia `mobile-first` y optimizada para iPhone.
- La interfaz debe sentirse nativa, limpia, premium, divertida e intuitiva.
- Debe verse bien desde el primer momento sin configuraciones adicionales.
- Si eliges framework, usa una base moderna y mantenible. Recomendacion: `React + Vite + TypeScript`.
- Implementa persistencia local real con `localStorage` o una capa equivalente para que la app funcione sin backend en la primera version.
- Deja la base preparada para una futura integracion con backend, autenticacion y notificaciones push.

## Flujo principal

Cuando el usuario entra en la app, lo primero que debe ver es su panel de habitos del dia. No quiero una portada vacia ni una home abstracta: el punto de entrada es directamente el estado actual de sus habitos.

La navegacion principal debe incluir:

- `Hoy`
- `Habitos`
- `Neurociencia`
- `Analisis IA`
- `Perfil o Ajustes`

## Pantalla inicial: Hoy

Esta pantalla debe mostrar de forma muy visual:

- Habitos programados para hoy
- Hora de cada habito
- Estado: pendiente, completado, omitido, atrasado
- Boton de check para marcar cumplimiento
- Boton para marcar que no se cumplio
- Indicador de progreso del dia
- Energia estimada del dia segun cumplimiento
- Alertas sobre cadenas de habitos conectados

Ejemplo de comportamiento:

Si el habito `Despertarme a las 06:00` falla, la app debe poder reflejar que eso puede comprometer `Ir al gimnasio a las 08:00`, y a su vez reducir la probabilidad o calidad de `Estudiar por la tarde`. Quiero una explicacion causal, legible y util, no una simple estadistica.
