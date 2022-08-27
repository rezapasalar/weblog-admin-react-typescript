import { faker } from '@faker-js/faker'
import Factory from '.'
import { createUserService } from '../../services/users'

class UserFactory extends Factory {

    $axios = createUserService

    defination () {
        const gender = faker.datatype.number({min: 0, max: 1})
        return {
            name: faker.name.firstName(gender ? 'female' : 'male'),
            family: faker.name.lastName(),
            day: faker.datatype.number({min: 1, max: 31}),
            month: faker.datatype.number({min: 1, max: 12}),
            year: faker.datatype.number({min: 1350, max: 1401}),
            gender,
            is_admin: faker.datatype.number({min: 0, max: 1}),
            email: this.fakeEmail(),
            password: '12345678',
            created_at: Date.now(),
        }
    }
}

export default new UserFactory()