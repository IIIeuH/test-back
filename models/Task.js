class CRUD{
    constructor(collection){
        this.collection = collection
        this.option = {}
    }

    async creat(data){
        data.created = new Date();
        return await db.collection(this.collection).insert(data);
    }

    async read(data) {
        this.skip(data);
        delete data.skip;
        this.limit(data);
        delete data.limit;
        this.sorter(data);
        delete data.sort;
        this.operand(data);

        return await db.collection(this.collection).find(data, this.option).toArray();
    }



    async readOne(data){
        data._id = ObjectId(data._id);
        return await db.collection(this.collection).findOne(data);
    }

    async update(query, data){
        return await db.collection(this.collection).update(query, {$set: data}, { multi: true });
    }

    async updateOne(query, data){
        query._id = ObjectId(query._id);
        return await db.collection(this.collection).updateOne(query, {$set: data});
    }

    async removeOne(query){
        query._id = ObjectId(query._id);
        return await db.collection(this.collection).remove(query);
    }

    async remove(query){
        return await db.collection(this.collection).remove(query, {multi: true});
    }

    limit(data){
        return (data.hasOwnProperty('limit')) ? Object.assign(this.option, {limit: +data.limit}) : Object.assign(this.option, {});
    }

    skip(data){
        return (data.hasOwnProperty('skip')) ? Object.assign(this.option, {skip: +data.skip}) : Object.assign(this.option, {});
    }

    sorter(data){
        if(data.hasOwnProperty('sort')){
            let arr = data.sort.split(',');
            let obj = {};
            arr.forEach( (key) => {
                if(key.charAt(0) === '-'){
                    let k = key.replace(/(-)/, '');
                    obj[k] = -1
                }else{
                    obj[key] = 1;
                };
            })
            return Object.assign(this.option,  {sort: obj})
        }else{
            return Object.assign(this.option, {});
        }
    }

    operand(data){
        try{
            let query = {};
            for(let item in data){
                let obj = {};
                if(!!~data[item].indexOf('$')){
                    data[item] = JSON.parse(data[item]);
                }
            }
            return data
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = CRUD;