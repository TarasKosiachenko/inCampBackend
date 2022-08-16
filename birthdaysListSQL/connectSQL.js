const { Client } = require('pg')
const planBirthdays = require('./planBirthday')

const client = new Client({
    user: 'birthdays_app',
    host: '127.0.0.1',
    database: 'birthdays',
    password: 'tarasko',
  })
  client.connect()

async function db_main() {
  await client
  .query('SELECT * FROM birthdays')
  .then(res => {
    planBirthdays(res.rows, 2)
    console.log('table SQL: ',res.rows)
    client.end()
})
  .catch(e => console.error(e.stack))
}

db_main()