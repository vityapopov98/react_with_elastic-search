import express from 'express';
const app = express();

// app.use(express.urlencoded({extended: true}));
// app.use(express.json()) // To parse the incoming requests with JSON payloads
import bodyParser from 'body-parser';
const urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(bodyParser.json());

import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

import fetch from 'node-fetch';
const { Headers } = fetch
global.Headers = Headers;


const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get('/api', (req, res)=>{
    res.json({status: 'ok'})
})

// ------ Получение документов от Elastic Seatch -------
// -----------------------------------------------------
app.get('/comments', (req, res)=>{
    
    var url = new URL('http://localhost:9200/comments/_search'),
    params = {
        from: req.query.page,
        size: req.query.documentPerPage
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    console.log('url : ',url)
    fetch(url).then(res=>{
        return res.json()
    }).then(data=>{
        console.log('Get to page',data)
        res.json(data)
    }).catch(err=>{
        console.error(err);
        res.json({status: err})
    })
})

// ------ Получение документов от Elastic Seatch -------
// --------------- с заданным фильтром -----------------
app.get('/filterComments', (req, res)=>{
    var sample = {
        query:{match:{}}
    }
    console.log('filter request', req.query)

    const searchableFields = ['_index', '_type', '_id', 'postId', 'name', 'email', 'body']
    searchableFields.forEach(field=>{
        if (req.query[field] != undefined) {
            sample.query.match[field] = req.query[field]
            console.log('sample obj', sample)
            
            fetch(`http://localhost:9200/comments/_search?source_content_type=application/json&source=${JSON.stringify(sample)}`).then(res=>{
                return res.json()
            }).then(data=>{
                console.log(data)
                res.json(data)
            }).catch(err=>{
                res.json(err)
            })
        }
    })
    
})


// -------- Добавление данных в Elastic Seatch ---------
// -----------------------------------------------------
app.post('/saveToElastic', (req, res)=>{
    const data = req.body.data
    console.log(req.body)
    sendData(data).then(res=>{
        console.log(res)
        res.json({status: 'ok'})
    }).catch(err=>{
        res.json({status: err})
    })
})

function sendData(data){
    return new Promise((resolve, reject)=>{
        fetch('http://localhost:9200/comments/_doc',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
            resolve(data)
        }).catch(err=>{
            console.error(err);
            reject(err)
        })  
    })
}