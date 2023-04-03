let ENVIRONMENT = 'production'

const getApiString = () => {
    switch (ENVIRONMENT) {
      case 'development':
        return 'http://192.168.1.65:4000'
      case 'testing':
        return 'https://tecambio-server-testing.onrender.com'
      case 'production':
        return 'https://api.tecambio.app'
      default:
        return 'https://api.tecambio.app'
    }
  }

export {
  getApiString
}