import { faker } from '@faker-js/faker'
import { AxiosResponse } from 'axios'

abstract class DataFactory {

    $locale: string = 'fa'

    $count: number = 10

    abstract $axios: (data: any) => Promise<AxiosResponse<any, any>>

    abstract defination (): {[x: string]: any}

    public create (): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.loopForCreate()
                return resolve(0)
            } catch (e) {
                return reject(e)
            }
        })
    }

    private async loopForCreate (): Promise<any> {
        try {
            faker.locale = this.$locale
            for (let i = 0; i < this.$count; i++) {
                await this.$axios(this.defination())
            }
        } catch (e) {
            return Promise.reject(e)
        }
    }

    public count (value: number = 10): DataFactory {
        this.$count = value
        return this
    }

    public locale (value: string): DataFactory {
        this.$locale = value
        return this
    }

    public axios (value: any): DataFactory {
        this.$axios = value
        return this
    }

    public fakeEmail (): string {
        faker.locale = 'en'
        const email = faker.internet.email()
        faker.locale = this.$locale
        return email
    }
}

export default DataFactory