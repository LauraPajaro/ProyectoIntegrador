import { seed } from "../seeds/index.js";

export const up = async function (knex) {
    return knex.schema
        .then(() => {
            return knex.schema.createTable('ipc', table => {
                //Generales
                table.increments('ipcId').primary();
                table.date('fecha').unique();
                table.float('valor');
            });
        })
        .then(() => {
            return knex.schema.createTable('icl', table => {
                //Generales
                table.increments('iclId').primary();
                table.date('fecha').unique();
                table.float('valor');
            });
        })
        .then(() => {
            return knex.schema.createTable('barrios', table => {
                //Generales
                table.increments('barrioId').primary();
                table.string('nombre');
                table.integer('comuna');
            });
        })
        .then(() => {
            return knex.schema.createTable('alquileres1Amb', table => {
                //Generales
                table.increments('alquiler1AmbId').primary();
                table.date('fecha');
                table.float('valor');
                table.integer('barrioId').references('barrioId').inTable('barrios').onDelete('CASCADE');
            });
        })
        .then(() => {
            return knex.schema.createTable('alquileres2Amb', table => {
                //Generales
                table.increments('alquiler2AmbId').primary();
                table.date('fecha');
                table.float('valor');
                table.integer('barrioId').references('barrioId').inTable('barrios').onDelete('CASCADE');
            });
        })
        .then(() => {
            return knex.schema.createTable('alquileres3Amb', table => {
                //Generales
                table.increments('alquiler3AmbId').primary();
                table.date('fecha');
                table.float('valor');
                table.integer('barrioId').references('barrioId').inTable('barrios').onDelete('CASCADE');
            });
        })
        .then(() => {
            return knex.schema.createTable('tiposPrediccion', table => {
                //Generales
                table.increments('tipoPrediccionId').primary();
                table.string('nombre');
            });
        })
        .then(() => {
            return knex.schema.createTable('modelos', table => {
                //Generales
                table.increments('modeloId').primary();
                table.float('mae');
                table.integer('steps');
                table.date('ultimaFechaEntrenamiento');
                table.string('nombreModelo');
                table.integer('tipoPrediccionId').references('tipoPrediccionId').inTable('tiposPrediccion').onDelete('CASCADE');
                table.integer('barrioId').references('barrioId').inTable('barrios').onDelete('CASCADE');
            });
        })
        .then(() => {
            return knex.schema.createTable('predicciones', table => {
                //Generales
                table.increments('prediccionId').primary();
                table.float('valor');
                table.float('valorMin');
                table.float('valorMax');
                table.date('fecha');
                table.integer('modeloId').references('modeloId').inTable('modelos').onDelete('CASCADE');
            });
        })
        .then(() => {
            return knex('tiposPrediccion').insert(
                [
                    { "nombre": "ipc" },
                    { "nombre": "icl" },
                    { "nombre": "alquileres1Amb" },
                    { "nombre": "alquileres2Amb" },
                    { "nombre": "alquileres3Amb" },
                ]
            );
        })
        .then(() => {
            return seed(knex); // Se debe retornar aquí también
        });
};

export const down = async function (knex) {
    await knex.schema.dropTableIfExists("predicciones");
    await knex.schema.dropTableIfExists("modelos");
    await knex.schema.dropTableIfExists("tiposPrediccion");
    await knex.schema.dropTableIfExists("alquileres3Amb");
    await knex.schema.dropTableIfExists("alquileres2Amb");
    await knex.schema.dropTableIfExists("alquileres1Amb");
    await knex.schema.dropTableIfExists("barrios");
    await knex.schema.dropTableIfExists("icl");
    await knex.schema.dropTableIfExists("ipc");
    await knex.destroy(); // Aquí se hace el destroy al final
};

export const config = { transaction: true };
