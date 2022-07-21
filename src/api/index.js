import './setup'
import server from './server'
import authenticationRoutes from './routes/authentication'
import salesRoutes from './routes/sales'
import subscriptionsRoutes from './routes/subscriptions'
import clubRoutes from './routes/club'
import { ROOT, sales, subscriptions, club } from './constants/paths'

server.use(ROOT, authenticationRoutes)
server.use(sales.ROOT, salesRoutes)
server.use(subscriptions.ROOT, subscriptionsRoutes)
server.use(club.ROOT, clubRoutes)
