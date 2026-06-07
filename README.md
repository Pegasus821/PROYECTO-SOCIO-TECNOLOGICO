# PROYECTO SOCIO TECNOLOGICO

## Formato del Proyecto
El sistema se implementará como una aplicación web (página única).

## Objetivos
Ofrecer a los alumnos contenidos interactivos para su formación en diversas áreas de conocimiento, evaluados a través de tests y cuestionarios de preguntas.

## Lógica de Negocio (Reglas del Sistema)

### Capacidades del Profesor
* **Gestión de Aula:** El profesor puede dar de alta un aula virtual vinculada a su cuenta.
* **Control de Contenido:** El profesor define los contenidos, las actividades, el formato de evaluación, el valor porcentual de las mismas, el número de intentos permitidos y la fecha límite de entrega.
* **Monitoreo:** El profesor tiene acceso exclusivo a las calificaciones e historial de progreso de todos los estudiantes inscritos en su aula.

### Capacidades del Estudiante
* **Acceso Autenticado:** Para interactuar con el contenido de un aula, el estudiante debe registrarse utilizando sus credenciales válidas (Nombre, contraseña y número de estudiante).
* **Visualización:** Cada estudiante tiene acceso únicamente a su propio porcentaje de notas y progreso.

### Restricciones
* **Límite de Carga:** El sistema bajo ninguna circunstancia permitirá a un profesor introducir un número de actividades superior a 9 por aula.
* **Aislamiento de Roles:** El profesor no puede interactuar con el contenido evaluativo ni realizar los tests bajo el rol de alumno.

### Gestión de Calificaciones e Intentos
* **Cálculo de Nota Final:** La calificación del estudiante en el aula se calculará mediante el promedio ponderado de las actividades vigentes.
* **Criterio de Intentos Múltiples:** Cuando una actividad permita más de un intento, el sistema registrará de forma definitiva la calificación más alta obtenida por el alumno [Alternativa: el promedio / el último intento].
* **Cierre de Actividades:** Una vez superada la fecha y hora de entrega límite, el sistema rechazará automáticamente cualquier intento de envío, cambiando el estado de la entrega a "No entregado" (calificación 0).
* **Inmutabilidad de Evaluaciones:** El profesor no podrá modificar el contenido, de una actividad que ya cuente con al menos un intento completado por algún estudiante.

### Reacciones Automáticas del Sistema
* Al completarse un test por parte del alumno, el sistema calculará la nota y actualizará su porcentaje general de forma inmediata.
* Al alcanzarse el límite de 9 actividades en un aula, el sistema deshabilitar la opción de crear nuevas actividades.
* Al llegar el llegar el límite de entrega, el sistema bloqueará automáticamente el acceso a la actividad para los alumnos.

### TABLAS DE DATOS

-- Generado por Tecnopraxis — Diseñador de BD

CREATE TABLE `usuarios` (
  `Id_Usuario` VARCHAR(255) NOT NULL,
  `Contrasena` VARCHAR(255),
  `Numero_de_Estudiante` VARCHAR(255),
  `Rol` VARCHAR(255),
  PRIMARY KEY (`Id_Usuario`)
);

CREATE TABLE `Aula` (
  `id_Aula` INT NOT NULL AUTO_INCREMENT,
  `Nombre_del_Aula` VARCHAR(255),
  `Id_Profesor` VARCHAR(255),
  `Cantidad_de_Alumnos` INT,
  PRIMARY KEY (`id_Aula`)
);

CREATE TABLE `Matriculas` (
  `id_Matricula` VARCHAR(255) NOT NULL,
  `Id_Estudiantes` VARCHAR(255),
  `Id_Aula` INT,
  `Notas` FLOAT(255),
  PRIMARY KEY (`id_Matricula`)
);

CREATE TABLE `Actividades` (
  `id_Actividad` INT NOT NULL AUTO_INCREMENT,
  `Id_Aula` INT,
  `Titulo` VARCHAR(255),
  `Contenido` TEXT,
  `Valor_Porcentual` INT,
  `Intentos_Permitidos` INT,
  `Tiempo_Limite` TIMESTAMP,
  PRIMARY KEY (`id_Actividad`)
);

CREATE TABLE `Intentos` (
  `id_Intentos` INT NOT NULL AUTO_INCREMENT,
  `Id_Estudiante` VARCHAR(255),
  `Id_Actividad` INT,
  `Numero_de_Intentos` INT,
  `Calificacion_Obtenida` FLOAT,
  `Calificaion Obtenida` FLOAT,
  PRIMARY KEY (`id_Intentos`)
);

ALTER TABLE `Aula` ADD CONSTRAINT `fk_rel_31` FOREIGN KEY (`Id_Profesor`) REFERENCES `usuarios` (`Id_Usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Matriculas` ADD CONSTRAINT `fk_rel_32` FOREIGN KEY (`Id_Estudiantes`) REFERENCES `usuarios` (`Id_Usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Matriculas` ADD CONSTRAINT `fk_rel_33` FOREIGN KEY (`Id_Aula`) REFERENCES `Aula` (`id_Aula`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Actividades` ADD CONSTRAINT `fk_rel_34` FOREIGN KEY (`Id_Aula`) REFERENCES `Aula` (`id_Aula`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Intentos` ADD CONSTRAINT `fk_rel_35` FOREIGN KEY (`Id_Estudiante`) REFERENCES `usuarios` (`Id_Usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Intentos` ADD CONSTRAINT `fk_rel_36` FOREIGN KEY (`Id_Actividad`) REFERENCES `Actividades` (`id_Actividad`) ON DELETE RESTRICT ON UPDATE CASCADE;
