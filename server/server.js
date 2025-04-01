require('dotenv').config();// Carica le variabili dal file .env
const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); //Un middleware che analizza i cookie inviati dal client al server.
const cors = require('cors'); //Un middleware che gestisce il Cross-Origin Resource Sharing, permettendo ad applicazioni in altri domini di comunicare con il server.
const authRoutes = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const adminOrderRouter = require('./routes/admin/order-routes')
const shopProductsRouter = require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopOrderRouter = require('./routes/shop/order-routes')
const shopSearchRouter = require('./routes/shop/search-routes')
const shopReviewRouter = require('./routes/shop/review-routes')
const commonFeatureRouter = require('./routes/common/feature-routes')

const URI_MONGO = process.env.URI_MONGO; // Usa la variabile di ambiente

mongoose.connect(URI_MONGO).then(()=>console.log('MongoDB Connected')).catch((error)=> console.log(error));

const app = express()
const PORT = process.env.PORT || 5000;

app.use( //Metodo per aggiungere middleware all'applicazione
    cors({
        origin : process.env.CLIENT_BASE_URL,
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-Type",
            "Auttorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true
    }) //Aggiunge il supporto per le richieste Cross-Origin. L'oggetto vuoto {} indica che tutte le origini sono permesse.
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);
app.use('/api/common/feature', commonFeatureRouter);

app.listen(PORT, ()=> console.log(`Server is now running on port ${PORT}`))