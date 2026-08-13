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

## Crear y editar habitos

Debe haber un boton claro y visible para crear un habito. Al crear o editar un habito, incluir como minimo:

- Nombre del habito
- Descripcion breve
- Categoria
  - Sueno
  - Ejercicio
  - Estudio
  - Alimentacion
  - Trabajo
  - Bienestar
  - Espiritualidad
  - Otro
- Dias de la semana en que aplica
- Hora objetivo
- Ventana de cumplimiento
  - Ejemplo: entre 06:00 y 06:30
- Nivel de prioridad
- Dificultad percibida
- Porcentaje objetivo de cumplimiento
  - Ejemplo: quiero cumplir este habito al 85%
- Color del habito
- Sticker o icono divertido
- Nota motivacional
- Tipo de recordatorio
  - suave
  - normal
  - insistente
- Minutos de antelacion del recordatorio
- Habitos de los que depende
- Habitos a los que impacta
- Beneficio esperado
- Coste de no cumplirlo

## Logica de dependencias entre habitos

Quiero un sistema de conexiones entre habitos que permita modelar relaciones como:

- `Despertarme temprano` influye positivamente en `Ir al gimnasio`
- `Ir al gimnasio` influye positivamente en `Concentracion para estudiar`
- `Dormirme tarde` influye negativamente en `Despertarme temprano`

Implementa un modelo visual y logico de dependencias:

- Dependencias positivas
- Dependencias negativas
- Dependencias fuertes o debiles
- Impacto estimado en energia
- Impacto estimado en foco
- Impacto estimado en disciplina
- Impacto acumulado del dia

Quiero que el usuario vea estas conexiones como una red simple y entendible, no como algo tecnico.

## Modulo de neurociencia

Crea una seccion llamada `Neurociencia` o `Conector neurocientifico`. Debe traducir principios cientificos a lenguaje claro, visual y accionable. No quiero pseudociencia ni frases vacias. Usa un tono profesional pero entendible.

La experiencia debe incluir:

- Explicacion de como los habitos se fortalecen por repeticion en contextos estables
- Importancia de las señales o disparadores
- Papel de la recompensa inmediata
- Diferencia entre intencion y automaticidad
- Friccion conductual
- Carga cognitiva
- Fatiga de decision
- Rol del sueño en autocontrol y memoria
- Relacion entre ejercicio y funcion ejecutiva
- Como una cadena de pequeños fallos puede deteriorar el resto del dia

## Fundamentacion cientifica del producto

Quiero que la logica explicativa de la app se inspire en principios ampliamente respaldados:

- Los habitos se consolidan por repeticion en contextos estables y claves consistentes, no solo por motivacion puntual.
- La automaticidad es un objetivo mas realista que depender siempre de fuerza de voluntad.
- Los planes tipo `si pasa X, entonces hago Y` son utiles para convertir intenciones en conducta.
- El sueño insuficiente perjudica procesos como atencion, memoria, regulacion emocional y rendimiento.
- El ejercicio se asocia con mejoras pequenas pero consistentes en cognicion y funcion ejecutiva.
- Las decisiones tempranas del dia pueden alterar energia, claridad y probabilidad de cumplimiento de habitos posteriores.

No cites papers dentro de la UI salvo en una seccion informativa especifica, pero si diseña los textos y analisis respetando esas bases.

## Analisis IA diario

Quiero un modulo muy potente de `Analisis IA` localmente simulado en esta primera version, con arquitectura preparada para conectar un modelo real despues. Este modulo debe:

- Analizar el dia actual
- Detectar patrones de cumplimiento e incumplimiento
- Explicar posibles causas en cascada
- Proponer ajustes concretos para mañana
- Identificar habitos gatillo
- Identificar habitos cuello de botella
- Detectar exceso de carga
- Detectar objetivos poco realistas
- Sugerir reducir friccion
- Sugerir cambiar horarios
- Sugerir dividir habitos demasiado grandes

Ejemplos de mensajes de analisis:

- `Hoy fallaste al despertarte a las 06:00. Eso redujo la probabilidad de cumplir el gimnasio y genero una caida de energia percibida antes del bloque de estudio. Mañana conviene adelantar la hora de dormir o simplificar la rutina de salida de la cama.`
- `Tu habito de estudio depende demasiado de decisiones previas. Conviene crear un disparador fijo y una version minima de 10 minutos para evitar el abandono completo.`

Este analisis debe sentirse sofisticado aunque en la primera version se apoye en reglas locales bien diseñadas.

## Gamificacion y diversion

Quiero que la app sea util, pero tambien divertida y muy intuitiva.

Añade:

- Stickers o emojis por habito
- Temas de color por habito
- Rachas
- Niveles o insignias
- Mensajes positivos inteligentes
- Microcelebraciones al completar
- Barra de estabilidad semanal
- Modo resumen visual del dia

Evita que se vea infantil, pero si que tenga personalidad.

## UX y diseño

Quiero un diseño movil de alta calidad, con personalidad propia. No uses una interfaz generica. Debe sentirse como una app premium de bienestar y rendimiento personal.

Directrices:

- Diseña para ancho de iPhone desde el inicio
- Componentes grandes y tactiles
- Jerarquia visual muy clara
- Buen contraste
- Tarjetas bonitas
- Animaciones sutiles
- Tipografia con personalidad
- Colores configurables por habito
- Iconografia o stickers integrados con gusto
- Modo claro muy pulido

## Pantallas sugeridas

Implementa como minimo estas vistas:

1. `Hoy`
2. `Todos los habitos`
3. `Crear o editar habito`
4. `Detalle del habito`
5. `Neurociencia`
6. `Analisis IA`
7. `Ajustes`

## Detalle del habito

Cada habito debe tener su propia pantalla con:

- Nombre
- Estado de hoy
- Historial de los ultimos dias
- Porcentaje de cumplimiento real
- Objetivo esperado
- Diferencia entre real y objetivo
- Dependencias de entrada y salida
- Explicacion neurocientifica de por que importa
- Botones para editar, duplicar y eliminar

## Estructura tecnica

Quiero una base ordenada, limpia y profesional.

Incluye:

- Componentes reutilizables
- Tipado claro si usas TypeScript
- Datos mock iniciales realistas
- Estado central o arquitectura facil de extender
- Helpers para calculo de rachas, cumplimiento y dependencias
- Modulo separado para motor de analisis
- Modulo separado para contenido neurocientifico
- Estilos mantenibles
- README con instrucciones

## Funcionalidades internas recomendadas

Aunque yo no lo haya pedido explicitamente, añade si mejora el producto:

- Seed inicial con varios habitos ejemplo
- Filtros por categoria o estado
- Calendario semanal
- Grafica simple de cumplimiento
- Reordenacion de habitos
- Version minima y version ideal de cada habito
- Campo `si fallo esto, que ajuste hago`
- Campo `señal ambiental`
- Campo `recompensa inmediata`
- Campo `identidad que refuerza`

## Copys y contenido

Escribe textos en español natural, premium y comprensible. No uses lenguaje tecnico innecesario. La parte de neurociencia debe sonar rigurosa, no exagerada ni vendehumo.

## Que quiero al final

Quiero que construyas el proyecto completo y dejes:

- Carpeta local con todo el codigo
- Proyecto ejecutable
- README claro
- Datos de ejemplo
- Interfaz visible desde el primer arranque
- Todo preparado para seguir creciendo

## Restricciones

- No hagas una maqueta vacia
- No dejes pantallas sin conectar
- No dependas de backend para la primera version
- No simplifiques la parte de dependencias entre habitos
- No conviertas la neurociencia en frases genericas

## Entregable esperado

Cuando termines, quiero:

- codigo completo
- estructura de proyecto clara
- explicacion breve de arquitectura
- pasos exactos para ejecutar

## Nota de producto importante

La esencia de esta app no es solo marcar checks. La esencia es explicar por que una persona falla, como se conectan sus habitos entre si, y como puede rediseñar su dia para que el cerebro tenga menos friccion y mas automaticidad. Quiero una app que combine seguimiento, analisis conductual, diseño emocional y una capa de neurociencia aplicada realmente util.
