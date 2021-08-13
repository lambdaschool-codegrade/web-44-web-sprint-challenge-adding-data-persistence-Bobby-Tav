
exports.up = async function(knex) {
    await knex.schema
    .createTable('projects',table =>{
        table.increments('project_id')
        table.string('project_name').notNullable()
        table.string('project_description')
        table.integer('project_completed').defaultTo(0);
    })
    .createTable('resources',table =>{
        table.increments('resource_id')
        table.string('resource_name').unique().notNullable()
        table.string('resource_description');
    })
    .createTable('tasks',table =>{
        table.increments('task_id')
        table.string('task_description').notNullable()
        table.string('task_notes')
        table.integer('task_completed').defaultTo(0)
        table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
  
};

exports.down = function(knex) {
    return knex.schema
  .dropTableIfExists('tasks')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')
  
  
};