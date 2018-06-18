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

// var logger = require('../../loggerFactory').getLogger('routers');
var Crypto = require('crypto');
var Secp256k1 = require('secp256k1');
var Keccak = require('keccak');
var Solc = require('solc');
var Web3 = require('web3');
var http = require('http');
var querystring = require('querystring');
var request = require('request');

var Const = require('../common/const');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/"));

//const
const PURE_HOLDER = String.fromCharCode(127);
const PURE_BE_REPLACED = '"';

var utility = {

    EnPure: function(text) {
        var reg = "/" + PURE_BE_REPLACED + "/gi";
        var res = text.replace(eval(reg), PURE_HOLDER);
        return res;
     },

    DePure: function(text) {
        var reg = "/" + PURE_HOLDER + "/gi";
        // console.log("reg: " + reg);
        var res = text.replace(eval(reg), PURE_BE_REPLACED);
        // console.log("res: " + res);
        return res;
    },

    GetNowInInt: function(){
        return new Date().getTime();
        // return (new Date().getTime() / 1000).toFixed(0);
        // return Math.floor(new Date().getTime() / 1000);
    },

    GetNowInInt_Normal: function(){
        return Utility.GetNowInInt() / 1000;
        //return new Date().getTime();
        // return (new Date().getTime() / 1000).toFixed(0);
        // return Math.floor(new Date().getTime() / 1000);
    },

    ArrayContains: function(array, value){
        var count = array.length;
        for(var i = 0; i < count; i++){
            if(array[i] == value){
                return true;
            }
        }
        return false;
    },

    indexOfArrary: function(array, value){
        var count = array.length;
        for(var i = 0; i < count; i++){
            if(array[i] == value){
                return i;
            }
        }
        return -1;
    },

    isStringContains: function(str, substr) {
        return str.indexOf(substr) >= 0;
    },


    ConvertBoolean: function(text){
        if(text == "true"){
            return true;
        }
        else if (text == "false"){
            return false;
        }
        else{
            return Boolean(text);
        }
    },

    FormatNumber: function(value){
        const Limit = 0.000001;//小于这个数就会用科学记数法
        if(value < Limit){
            return parseFloat(parseFloat(value).toFixed(10)).toFixed(10);
        }
        else{
            return parseFloat(parseFloat(value).toFixed(10));
        }
    },

    IsValidValue: function(value){
        var temp = parseFloat(value);
        return !isNaN(parseFloat(value));
    },

    GetRandomNum: function (min,max)
    {
        var range = max - min;
        var rand = Math.random();
        return(min + Math.round(rand * range));
    },

    ToUnixTime: function(year, month, day, hour, minute, second) {
        return Date.UTC(year, month - 1, day, hour, minute, second) / 1000;
    },

    ToCommonTime: function(unixTime){
        var unixTimestamp = new Date(unixTime * 1000);
        var commonTime = unixTimestamp.toUTCString();
        return commonTime;
    },

    FromOneStringToUnixTime: function(dateString){//date format: year, month, day, hour, minute, second
        var sections = dateString.split(",");
        return Utility.ToUnixTime(sections[0], sections[1], sections[2], sections[3], sections[4], sections[5]);
    },

    formatTime: function(format) {
        var curDate = new Date();
        if (format == undefined) return curDate;
        format = format.replace(/Y/i, curDate.getFullYear());
        format = format.replace(/m/i, utility.fix2number(curDate.getMonth() + 1));
        format = format.replace(/d/i, utility.fix2number(curDate.getDate()));
        format = format.replace(/H/i, utility.fix2number(curDate.getHours()));
        format = format.replace(/i/i, utility.fix2number(curDate.getMinutes()));
        format = format.replace(/s/i, utility.fix2number(curDate.getSeconds()));
        format = format.replace(/ms/i, curDate.getMilliseconds());
        return format;
    },

    fix2number: function(n) {
        return [0,n].join('').slice(-2);
    },

    getValueInMap: function(array, key){
        var count = array.length;
        for(var i = 0; i < count; i++){
            if(array[i].key == key){
                return array[i].value;
            }
        }
        return null;
    },

    setValueInMap: function(array, key, value){
        try{
            var count = array.length;
            for(var i = 0; i < count; i++){
                if(array[i].key == key){
                    array[i].value = value;
                    return true;
                }
            }
            var newItem = {};
            newItem.key = key;
            newItem.value = value;
            array.push(newItem);
            return true;
        }
        catch(error){
            return false;
        }
    },

    // Console: function(content){
    //     logger.info("" + Utility.ToCommonTime(Utility.GetNowInInt_Normal()) +  ": " + content);
    // },

    //moac, eth
    createAccount: function(){
        //获得随机的32个字节作为私钥，在使用中，请注意随机数来源的安全
        var privateKey = Crypto.randomBytes(32);
        var address = utility.getAddressByPrivateKey(privateKey);

        var account = {};
        account.address = address;
        account.privateKey = privateKey.toString('hex');
        return account;
    },

    doesAddressPrivateKeyMatch: function(address, privateKey){
        var newKey = new Buffer(privateKey, 'hex');
        var addressByKey =  utility.getAddressByPrivateKey(newKey);
        return address.toLowerCase() == addressByKey.toLowerCase();
    },

    getAddressByPrivateKey: function (privateKey) {
        //获得公钥
        var publicKey = Secp256k1.publicKeyCreate(privateKey, false).slice(1);
        //获得地址
        var address = Keccak('keccak256').update(publicKey).digest().slice(-20);

        return Const.PREFIX_ETH + address.toString('hex');
    },

    isGasValid: function(value){
        if(value === null){
            return false;
        }
        var result = Number(value) > 0;
        return result;
    },

    parseContract: function(tokenName, contractContent){
        var input = {
            file: contractContent
        };
        var output = Solc.compile({sources: input}, 1);
        name = "file:" + tokenName;
        var token = output.contracts[name];
        if(token == null){
            console.log('token is null: ', token);
            return null;
        }
        return token;
    },

    getAbi: function(tokenName, contractContent){
        var token = utility.parseContract(tokenName, contractContent);
        return JSON.parse(token.interface);
    },

    getBytecode: function(tokenName, contractContent){
        var token = utility.parseContract(tokenName, contractContent);
        return Const.MOAC_PREFIX + token.bytecode;
    },

    //build standard response
    buildResponse: function(error, data){
        var response = {};
        if(error){
            response.code = 500;
            response.success = false;
            response.message = error.message;
            response.data = error;
            console.log("===Error=== ", JSON.stringify(response));
        }
        else{
            response.code = 200;
            response.success = true;
            response.message = "";
            response.data = data;
        }
        return response;
    },

    convert2Hex: function(data){
        // console.log(data, "   ", web3.utils.isHex(data));
        if(web3.utils.isHex(data)){
            return data;
        }
        else{
            //不能使用web3.utils.toHex(data)，比如data=0x5431za会被认为是合法的hex。
            // console.log(data, "   ", web3.utils.toHex(data));
            // return web3.utils.toHex(data);
            var newdata = new Buffer(data);
            return Const.PREFIX_ETH + newdata.toString('hex');
        }
    },


    //http
    sendRequest: function(url, method, parser, rawData, callback){
        //default is JSON
        var data = JSON.stringify(rawData);
        var parser_text = Const.PARSER_TEXT_JSON;

        if(parser == Const.PARSER_NAME_URLENCODED){
            var data = querystring.stringify(rawData);
            var parser_text = Const.PARSER_TEXT_URLENCODED;
        }

        var options = {
            url: url,
            method: method,
            headers:{
                "content-type": parser_text,
            },
            body: data
        }

        request(options, function(error, response, body) {
            if(error){
                callback(error);
            }
            else if(response.statusCode != 200){
                callback(response);
            }
            else{
                callback(null, body);
            }
        });
    },
};

module.exports = utility;