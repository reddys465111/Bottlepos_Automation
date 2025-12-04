

export interface IEnvironmentStructure {
    [key: string]: {
        URL: string,
        USR: string,
        PSW: string,
        SESSION: string,
        DEVICE: {
            Name: string,
            Index: number
        },
        LOCATION: {
            Name: string,
            Index: number
        },
        API: {
            PSW: string,
            HEADERS: {
                'Cookie': string,
                'Content-Type': string
            }
            URL: string
        }
    }
}
export const EnvironmentSessions: IEnvironmentStructure = {
    AUTO: {
        URL: 'http://localhost:9001', 
        // URL: 'https://auto.bottlepos.com',
        // URL: 'https://release.bottlepos.com',
        USR: 'admin',
        PSW: 'bottlepos',
        SESSION: 'qaSession.json',

        DEVICE: {
            Name: 'Register1 (Inventory)',
            Index: 7
        },
        LOCATION: {
            Name: 'Inventory',
            Index: 1
        },
        API: {
            PSW: '38076b9a1a153ff3bcfa0d4e6d89b6d9f1895578e0194911bce3a2d248bfe005',
            HEADERS: {
                'Cookie': 'PHPSESSID=r1vbpnb5av15lueajn0bgkfsv0',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            URL: 'http://localhost:8000'
        }
    }
}