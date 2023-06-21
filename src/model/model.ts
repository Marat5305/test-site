    module.exports = {
        modelLoad: async function(model: any, tf: any): Promise<void> {
            console.log('Loading Model...');
            if (model === null) {
                console.log("Модель не загружена");
            }
            model = tf.loadLayersModel('file://src/tfjsModel/model.json', false);
            if (model != null) {
                console.log('Model Loaded Successfull');
            }
            return model;
        },
        recommend: async function(userId: number): Promise<any> {
            let goods = require('../../data/dnsGoods.json');
            let tf = require('@tensorflow/tfjs-node');
            let model: any = null;
            let good_arr = tf.range(0, goods.length);
            let good_len = goods.length;
            let user = tf.fill([good_len], userId);
            let good_in_js_array = good_arr.arraySync();

            model = await this.modelLoad(model, tf);

            console.log(`Рекомендации для пользователя: ${userId}`);
            let pred_tensor = model.predict([good_arr, user]).reshape([goods.length]);
            const pred = pred_tensor.arraySync();
            
            let recommendations = [];
            for (let i = 0; i < 6; i++) {
                var max = pred_tensor.argMax().arraySync();
                recommendations.push(goods[max]); 
                pred.splice(max, 1);    
                pred_tensor = tf.tensor(pred); 
            }
            return recommendations;
        }
    }
    

    

   

  


    







