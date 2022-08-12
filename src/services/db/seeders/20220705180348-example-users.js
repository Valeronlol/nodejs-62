const { faker } = require('@faker-js/faker')
const tableName = 'Users'

const seedCount = 2
const seedBunch = 1
const moods = [
  'good',
  'nice',
  'fine',
]

const getRandomArrayEl = arr => arr[Math.floor(Math.random() * arr.length)]

const getFakeUsers = (count) => (new Array(count))
  .fill(null)
  .map((_, i) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    mood: getRandomArrayEl(moods),
    age: faker.datatype.number({ min: 7, max: 70 }),
    createdAt: new Date(),
  }))

module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = seedBunch; i < seedCount; i += seedBunch) {
      const bunchOfFakeUser = getFakeUsers(seedBunch)
      await queryInterface.bulkInsert(tableName, bunchOfFakeUser, {})
      console.log(`Migrated users: ${i} of ${seedCount} = ${(i * 100 / seedCount).toFixed(1)}%`)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
