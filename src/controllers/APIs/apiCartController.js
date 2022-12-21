const db = require('../../database/models')
module.exports = {
    list : async (req, res) => {
        try {
            return res.status(200).json({
                ok :true,
                data : req.session.orderCart || null
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'no anda esto'
            })
        }
    },
    addItem : async (req,res) => {
        try {

            const {id} = req.body;
            let item = req.session.orderCart.items.find(item => item.product.id === +id);

            if(item) {

                await db.Cart.update(
                    {
                        quantity : item.quantity + 1
                    },
                    {
                      where : {
                        id : item.id
                      }  
                    }
                )

                const itemsModify = req.session.orderCart.items.map(element => {
                    if(element.id === item.id){
                        element.quantity = element.quantity + 1;
                        return element
                    }

                    return element
                })

                const prices = req.session.orderCart.items.map((item) => item.product.price * item.quantity)

                const total = prices.reduce((acum, num) => acum + num, 0);


                await db.Order.update(
                    {
                        total
                    },
                    {
                        where : {
                            id : req.session.orderCart.id
                        }
                    }
                )

                req.session.orderCart = {
                    ...req.session.orderCart,
                    total,
                    items : itemsModify
                   }

            }else {

               const newCart = await db.Cart.create({
                    quantity : 1,
                    products_id : id,
                    orders_id : req.session.orderCart.id
               });

               const cartItem = await db.Cart.findByPk(newCart.id, {
                attributes : ['id','quantity'],
                include : [
                  {
                    association : 'product',
                    attributes : ['id','title','price','discount'],
                    include : ['images']
                    
                  }
                ]
               });

               const prices = req.session.orderCart.items.map((item) => item.product.price * item.quantity)

               const total = prices.reduce((acum, num) => acum + num, 0);


               await db.Order.update(
                   {
                       total
                   },
                   {
                       where : {
                           id : req.session.orderCart.id
                       }
                   }
               )

               req.session.orderCart = {
                ...req.session.orderCart,
                total,
                items : [
                    ...req.session.orderCart.items,
                    cartItem
                ]
               }

            }

            return res.status(201).json({
                ok : true,
                data : req.session.orderCart || null
            })

            
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'apa'
            })
        }
    },
    removeItem  : async (req, res) => {
        try {
            const {id} = req.params;
          
            let item = req.session.orderCart.items.find(item => item.product && item.product.id === +id);

            if(item.quantity > 1){
                await db.Cart.update(
                    {
                        quantity : item.quantity -1 
                    },
                    {
                        where :{
                            products_id : id,
                            orders_id  : req.session.orderCart.id

                        }
                    }
                )

                const itemsModify = req.session.orderCart.items.map(element => {
                    if(element.id == item.id){
                        element.quantity = element.quantity - 1;
                        return element
                    }

                    return element
                })

                const prices =itemsModify.map((item) => item.product.price * item.quantity)

                const total = prices.reduce((acum, num) => acum + num, 0);

                await db.Order.update(
                    {
                        total
                    },
                    {
                        where : {
                            id : req.session.orderCart.id
                        }
                    }
                )

                req.session.orderCart = {
                    ...req.session.orderCart,
                    total,
                    items : itemsModify
                   }

            }else{
              
                   await db.Cart.destroy({
                    where : {
                        products_id  : item.product.id,
                        orders_id  : req.session.orderCart.id

                  }
                });
                const itemsModify = req.session.orderCart.items.filter(element => element.product.id != item.id)

                const prices =itemsModify.map((item) => item.product.price * item.quantity)

                const total = prices.reduce((acum, num) => acum + num, 0);

                await db.Order.update(
                    {
                        total
                    },
                    {
                        where : {
                            id : req.session.orderCart.id
                        }
                    }
                )
                req.session.orderCart = {
                    ...req.session.orderCart,
                    total,
                    items : itemsModify
                   }
            }
            return res.status(201).json({
                ok : true,
                data : req.session.orderCart || null
            })

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'apa'
            })
        }
    },
    removeAllItem : async (req,res) => {
        const {id} = req.params;

        console.log('>>>>>>>>>>>>>>>>',id);

        try {
            await db.Cart.destroy({
                where : {
                    products_id  : id,
                    orders_id  : req.session.orderCart.id
                }
            })

            const itemsModify = req.session.orderCart.items.filter(element => element.product.id != id)

            const prices =itemsModify.map((item) => item.product.price * item.quantity)

            const total = prices.reduce((acum, num) => acum + num, 0);

            await db.Order.update(
                {
                    total
                },
                {
                    where : {
                        id : req.session.orderCart.id
                    }
                }
            )



            req.session.orderCart = {
                ...req.session.orderCart,
                total,
                items : itemsModify
               }

               return res.status(201).json({
                ok : true,
                data : req.session.orderCart || null
            })

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'apa'
            })
        }
    }

}