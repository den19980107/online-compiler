import express, { Request, Response, NextFunction } from 'express';
import { languageEnum } from '../Types/languageTypes'
import compiler from 'compile-run';
import { UserModel } from '../models/user';

const router = express.Router();

router.post('/', async function (req: Request, res: Response) {
   const apiKey: string = req.body.apiKey;
   const userId: string = req.body.userId;
   let user = await UserModel.getUserById(userId);
   if (user && user.apiKey && user.apiKey == apiKey) {
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
         case languageEnum.python3:
         case languageEnum.python:
            result = await compiler.python.runSource(script, { stdin: stdin, timeout: 5000, compileTimeout: 5000 });
            break;
      }
      res.json(result)
   } else {
      res.status(500).json("資料填寫錯誤")
   }
})

export = router;

