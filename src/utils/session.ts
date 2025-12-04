/**
 * this Session variable is used on execution,
 * will be filled every time that tests are executed
 */
export let Session = {
    Password: '',
    User: '',
    URL: '',

    Device: {
        Name: '',
        Index: -1,
        Id: ''
    },
    Location: {
        Name: '',
        Index: -1,
        Id: ''
    },
    API: {
        PSW: '',
        Headers: {},
        Params: {},
        URL: ''
    }
};