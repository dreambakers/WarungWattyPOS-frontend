import { environment } from '../environments/environment';

export const constants = {
    apiUrl: environment.production ? 'https://warung-watty.herokuapp.com' : 'http://localhost:3000',
    emitterKeys: {
        itemAdded: 'itemAdded',
        itemUpdated: 'itemUpdated',
        orderCreated: 'orderCreated'
    }
}