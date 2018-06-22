/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2018/6/16 14:45:34                           */
/*==============================================================*/


drop table if exists block_info;

drop table if exists waterflow_info;

/*==============================================================*/
/* Table: block_info                                            */
/*==============================================================*/
create table block_info
(
   id                   varchar(100) not null,
   hash                 varchar(500),
   gas_limit            bigint,
   gas_used             bigint,
   extra_data           text,
   difficulty           varchar(2000),
   logs_bloom           varchar(2000),
   miner                varchar(500),
   mix_hash             varchar(500),
   nonce                varchar(500),
   number               bigint,
   paren_thash          varchar(1000),
   receipts_root        varchar(1000),
   sha3_uncles          varchar(1000),
   size                 bigint,
   state_root           varchar(1000),
   timestamp            bigint,
   total_difficulty     varchar(2000),
   transactions_root    varchar(1000),
   transactions         text ,
   uncles               text,
   createtime           bigint,
   primary key (id)
);

/*==============================================================*/
/* Table: waterflow_info                                        */
/*==============================================================*/
create table waterflow_info
(
   id                   varchar(100) not null,
   block_hash           varchar(500),
   block_number         bigint,
   from_src             varchar(500),
   gas                  bigint,
   gas_price            bigint,
   hash                 varchar(500),
   input                text,
   nonce                bigint,
   syscnt               varchar(500),
   to_dest              varchar(500),
   transaction_index    bigint,
   value                varchar(500),/**有可能存不了**/
   v                    text,
   r                    text,
   s                    text,
   sharding_flag        varchar(500),
   tradetime            bigint,
   createtime           bigint,
   input_assicc         text,
   input_utf8           text
);

