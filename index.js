//index.js
const express = require('express') //③번 단계에서 다운받았던 express 모듈을 가져온다.
const app = express() //가져온 express 모듈의 function을 이용해서 새로운 express 앱을 만든다. 🔥
const port = 5000 //포트는 4000번 해도되고, 5000번 해도 된다. -> 이번엔 5000번 포트를 백 서버로 두겠다.

const test = function(err,req,res,next){
let responsModel;


 if (
    err instanceof UserNotFoundError ||
    err instanceof ValidationError
  ) {
  responsModel = new ResponsModel(err);
 }
 else responsModel = new ResponsModel(new InternalServerError('InternalSeverError'));

  res.status(responsModel.status).send(responsModel) ;
}

class ResponsModel {
  constructor (error) {
    this.status = error.statusCode;
    this.flag = error.flag;
    this.message = error.message;
    this.data = {}
  }
}

class BaseError extends Error{
  constructor(message, flag = ''){
    super(message)
    this.flag = flag;
    this.statusCode = 500;
  }
}

class UserNotFoundError extends BaseError {
  constructor(message, flag) {
    super(message, flag)
    this.statusCode = 400;
  }
}

class ValidationError extends BaseError {
  constructor(message, flag) {
    super(message, flag)
    this.statusCode = 400;
  }
}

class TestError {
  constructor(message, flag) {
    this.message = message;
    this.flag = flag;
    this.statusCode = 400;
  }
}

class InternalServerError extends BaseError {
  constructor(message, flag) {
    super(message, flag)
  }
}

app.get('/', (req, res,next) => { //express 앱(app)을 넣고, root directory에 오면, 

  try{
    let a = [1];

    console.log(a[2].length);

    throw new ValidationError('틀렸음')
    console.log("Hello World")
    res.send('Hello World!') //"Hello World!" 를 출력되게 해준다. 

  }catch(e){
    next(e);
  }

})

app.use(test)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
}) //포트 5000번에서 이 앱을 실행한다.s