#kifugo

Kifugo is an online go game kifu respository and kifu player.
It is an **Angular2** app based on Nathan Walker's [angular-seed_advanced](https://github.com/NathanWalker/angular-seed-advanced).
The backend of this app is at [kifugo-backend](https://github.com/CG0323/kifugo-backend), which is **Node.js** + **Mongodb** Rest API.
-------- 

## Demo
![Kifus](images/kifu.gif)  ![Player](images/player.gif)  

## Techniques Practiced:

### Angular2 Basic
``

### Primeng integration
The kifu list & searching compoent is built based on [Primeng Datatable](http://www.primefaces.org/primeng/#/datatable).
Adding primeng to the ng2 seed project is referenced to [this instruction](https://github.com/mgechev/angular-seed/wiki/Add-PrimeNG)

### Backend pagination
Go-Game kifus repository is a large dataset, it is not a good idea to load all the data once, Primeng Datatable's lazyload feature 
is used together with backend pagination:

in frontend:  
```typescript
  searchKifus(first:number, rows:number, player:string):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var params = {first:first, rows:rows, player:player};
    return this.http.post(AppConfig.API_BASE + 'kifus/search', params, options)
      .map(res => {
        return {res:res.json(), params:params};
      });
  }
```
in backend:  
```javascript
router.post('/search', function(req, res, next) {
    var param = req.body;
    var first = param.first;
    var rows = param.rows;
    var player = param.player;
    var conditions = {};
    if (player) {
        conditions = { $or: [{ pb: { $regex: player } }, { pw: { $regex: player } }] };
    }
    Kifu.find(conditions)
        .sort({ dt: -1 })
        .skip(first)
        .limit(rows)
        .select('dt name pb br pw wr re km')
        .exec()
        .then(function(kifus) {
                Kifu.count(conditions, function(err, c) {
                    if (err) {
                        logger.error(err);
                        res.status(500).send("falied to get totoal count");
                    }
                    res.status(200).json({
                        totalCount: c,
                        kifus: kifus
                    })
                });
            },
            function(err) {
                res.status(500).send("failt to search kifus");
            }
        )
});
```

### Rxjs operators

### Ngrx/Store

### Ngrx/Effects

### Smart components & Dumb components

### HTML5 SVG

### Media query

# Table of Contents

## License
MIT