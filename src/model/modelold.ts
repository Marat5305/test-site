import tf from '@tensorflow/tfjs-node';
import { json } from 'stream/consumers';
//import goodsJson from '../data/books.json' with {type: 'json'};

export class ModelClass {
    model: any;
    goods = require('.../data/books.json');

    async loadModel(): Promise<void> {
        console.log('Loading Model...');
        this.model = tf.loadLayersModel('file://model.json');
    
        console.log('Model Loaded Successfull');
        // model.summary()
    }

    good_arr = tf.range(0, this.goods.length)
    good_len = this.goods.length


    async recommend(userId: number): Promise<any> {
        let user = tf.fill([this.good_len], userId);
        let good_in_js_array = this.good_arr.arraySync();
        await this.loadModel();
        console.log(`Recommending for User: ${userId}`);
        var pred_tensor = await this.model.predict([this.good_arr, user]).reshape([10000]);
        const pred = pred_tensor.arraySync();
        
        let recommendations = [];
        for (let i = 0; i < 6; i++) {
            var max = pred_tensor.argMax().arraySync();
            recommendations.push(this.goods[max]); //Push good with highest prediction probability
            pred.splice(max, 1);    //drop from array
            pred_tensor = tf.tensor(pred); //create a new tensor
        }
        
        return recommendations;


    }

}





