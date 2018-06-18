/**
 * Moac end project;
 * @version 0.0.1
 * Copyright (C) 2018 by Sparkchain Inc.
 * or its affiliates. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Create by Foreso @ 20180410
 *
 */

//var moacRouter = require('./modules/moac/moacRouter');
//var moac_old_Router = require('./modules/moac/moac_old_Router');
//var ethRouter = require('./modules/eth/ethRouter');
// var jingtumRouter = require('./modules/jingtum/jingtumRouter');
// var explorerRouter = require('./modules/explorer/explorerRouter');
// var testRouter = require('./modules/test/testRouter');

var BlockRouter=require("./modules/moacEvent/BlockRouter");
module.exports = function (app) {
     BlockRouter(app);
   
};

