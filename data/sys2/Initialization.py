# -*- coding: utf-8 -*-
"""
Created on Tue Dec 12 10:34:59 2017

@author: Administrator



# 1 err：无法写入数据
"""
import pymongo
from pymongo import MongoClient

def MongoDB():
    weight = [0.04,0.06,0.08,0.10,0.12,0.13,0.14,0.12,0.11,0.10]
    condition = [[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100]]
    conn = MongoClient('127.0.0.1',27017)
    mydata = conn['mydata']
    users = mydata['users']
    users.insert_one({'蔡日天':'蔡雨昊'})
    u2 = mydata.users.find_one({"蔡日天":"蔡雨昊"}) # 查不到时返回 None
    mydata.users.insert_one({"_id" :101,'weight':weight})
    mydata.users.insert_one({"_id" :102,'condition':condition})
    print u2

def main():
    weight = [0.04,0.06,0.08,0.10,0.12,0.13,0.14,0.12,0.11,0.10]
    condition = [[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100]]
    weather = [[25.6,86],[24.0,97],[26.3,75],[24.8,96],[25.6,87],[25.7,81],[21.6,68],[28.6,50],[22.6,76],[20.9,82]]
    data2 = [16,70],[15,80],[20,60],[23,60],[21.5,60],[19.8,58],[15.7,70.9],[13.2,76.8],[16.5,75],[28,78.5]
    
    post_weight = {'_id':101,'weight':weight}
    post_condition = {'_id':102,'condition':condition}
    post_weather = {'_id':103,'weather':weather}
    post_feedback = {'_id':104,'feedback':data2,'posibility':0.5,'temp':1}
    
    conn = MongoClient('localhost',27017)
    mydata = conn['mydata']
    mydata.users = mydata['users']
    mydata.users.insert_many([post_weight,post_condition,post_weather,post_feedback])
    
if __name__ == "__main__":
    main()