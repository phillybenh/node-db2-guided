// the .up() records the changes to be applied to the db
exports.up = function (knex) {
    // create the veggies table
    return knex.schema.createTable('veggies', tbl => {
        //primary key, celled id, autoincrements, not null
        tbl.increments();

        tbl.string('name', 255).notNullable().unique();
        tbl.boolean("tasty");

        tbl.timestamps(true, true); // created_at and updated_at

    })
};

// the .down() records how to undo the .up() changes
exports.down = function (knex) {
    // remove the veggies table
    return knex.schema.dropTableIfExists("veggies");
};
