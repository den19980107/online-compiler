import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { languageEnum } from './Types/languageTypes'
import compiler from 'compile-run';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/compile', async function (req: Request, res: Response) {
   const script: string = req.body.script;
   const stdin: string = req.body.stdin;
   const language: languageEnum = req.body.language;
   let result;
   switch (language) {
      case languageEnum.c:
         result = await compiler.c.runSource(script, { stdin: stdin, timeout: 5000, compileTimeout: 5000 });
         break;
      case languageEnum.cpp:
         result = await compiler.cpp.runSource(script, { stdin: stdin, timeout: 5000, compileTimeout: 5000 });
         break;
      case languageEnum.java:
         result = await compiler.java.runSource(script, { stdin: stdin, timeout: 5000, compileTimeout: 5000 });
         break;
      case languageEnum.javascript:
         result = await compiler.node.runSource(script, { stdin: stdin, timeout: 5000, compileTimeout: 5000 });
         break;
      case languageEnum.python:
         result = await compiler.python.runSource(script, { stdin: stdin, timeout: 5000, compileTimeout: 5000 });
         break;
   }
   res.json(result)
})

app.get('/', function (req: Request, res: Response) {
   res.sendFile(path.resolve(__dirname, 'Public', 'index.html'));
})


app.listen(port, () => console.log(`Server is running on port ${port}!`));
