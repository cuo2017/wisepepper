# -*- coding: utf-8 -*-
"""
Created on Wed Jan 03 10:58:48 2018

@author: Administrator
"""

# -*- coding: utf-8 -*-
"""
Created on Mon Dec 11 15:58:01 2017

@author: Administrator
"""
from pymongo import MongoClient
import xlrd 
import xlwt 
import numpy as np
from scipy.integrate import quad 

def open_excel(file='nanc.xlsx'):  
    try:  
        data = xlrd.open_workbook(file)  
        return data  
    except Exception,e:  
        print str(e) 

def calculation_cos(a,b):
    a=a/32*100
    sa=75
    sb=95
    inner_product = a*sa+b*sb
    product_ab = (a*a+b*b)**0.5
    product_standard = (sa*sa+sb*sb)**0.5
    product_cos = inner_product/(product_ab*product_standard)
    return product_cos

def final_sim(sim_temp,weight):
    f_sim=weight[0]*sim_temp[0]+weight[1]*sim_temp[1]+weight[2]*sim_temp[2]+weight[3]*sim_temp[3]
    f_sim=f_sim+weight[4]*sim_temp[4]+weight[5]*sim_temp[5]+weight[6]*sim_temp[6]
    f_sim=f_sim+weight[7]*sim_temp[7]+weight[8]*sim_temp[8]+weight[9]*sim_temp[9]
    #f_sim=f_sim*10-9
    return f_sim

def calculation(data1,weight,condition):
    table = data1.sheets()[0]
    nrows = table.nrows #行数  
    # ncols = table.ncols #列数 
    sim_temp = [i for i in range(10)]
    sim = [i for i in range(nrows)]
    for i in range(nrows):
        if(i>=6 and i < nrows - 3):
            index=0;
            for j in range(i-6,i+4):
                sim_temp[index]=calculation_normal(table.row(j)[0].value,table.row(j)[1].value,condition,j-i+6)
                index = index + 1
            sim[i]=final_sim(sim_temp,weight)
        else:
            sim[i] = 0;
    return sim

def calculation_normal(a,b,condition,i):
    z=11.84096
    temp = condition[i][1]
    x_b=b + 100 - temp
    x_a = a + 23 - condition[i][0]
    posiblity_b= -0.904168893015376/(1+np.exp(0.0989563746560983*(x_b-66.6238959341298)))+0.933387168740955
    if(x_a>=23):
        left_a=46-x_a
        integral_temp=quad(lambda x:((1/(2*3.141592653*z*z))**0.5)*np.exp(-((x-23)**2)/(2*z*z)),left_a,a)
        posiblity_a=1-integral_temp[0]
    else:
        right_a=46-x_a
        integral_temp=quad(lambda x:((1/(2*3.141592653*z*z))**0.5)*np.exp(-((x-23)**2)/(2*z*z)),a,right_a)
        posiblity_a=1-integral_temp[0]
    posiblity_ab=(posiblity_b+posiblity_a)/2
    #print posiblity_ab
    return posiblity_ab
        
                

def write_excel(data1,sim):
    table = data1.sheets()[0]
    nrows = table.nrows #行数
    #新建一个excel文件  
    file = xlwt.Workbook()  
    #新建一个sheet  
    table1 = file.add_sheet('info',cell_overwrite_ok=True)  
    #写入数据table.write(行,列,value)  
    for i in range(nrows):
        table1.write(i,0,table.row(i)[0].value)  
        table1.write(i,1,table.row(i)[1].value)
       # if(i%3==0):
        table1.write(i,2,sim[i]) 
    #保存文件  
    file.save('file.xls')  

def correct_weight(sim_temp,weight,posibility):
    max_min = [[1,0],[0,0]]
    final_sim1 = final_sim(sim_temp,weight)
    for i in range(10):
        temp1 = abs(sim_temp[i] - posibility)
        if( temp1 <= max_min[0][0] ):
            max_min[0][0] = temp1
            max_min[0][1] = i
        if(temp1 >= max_min[1][0]):
            max_min[1][0] = temp1
            max_min[1][1] = i
    weight[max_min[0][1]] = weight[max_min[0][1]] + 0.01*abs(posibility - final_sim1)
    weight[max_min[1][1]] = weight[max_min[1][1]] - 0.01*abs(posibility - final_sim1)
    return weight




def correct_condition(sim_temp,condition,posibility,feed_data):
    for i in range(10):
        difference = posibility - sim_temp[i]
        condition[i][0] = condition[i][0] - difference*(condition[i][0] - feed_data[i][0])
        condition[i][1] = condition[i][1] - difference*(condition[i][1] - feed_data[i][1])
    return condition




def feedback(weight,condition,feed_data,posibility):
    sim_temp = []
    for i in range(10):
        temp = calculation_normal(feed_data[i][0],feed_data[i][1],condition,i)
        sim_temp.append(temp)
    weight = correct_weight(sim_temp,weight,posibility)
    condition = correct_condition(sim_temp,condition,posibility,feed_data)
    return condition,weight
 
    
def test(weight,condition):
    for j in range(100):
        data2 = [16,70],[15,80],[20,60],[23,60],[21.5,60],[19.8,58],[15.7,70.9],[13.2,76.8],[16.5,75],[28,78.5]
        po=[]
        for i in range(10):
            temp=calculation_normal(data2[i][0],data2[i][1],condition,i)
            po.append(temp)
        sim = final_sim(po,weight)
        if(j%10==0):
            print sim
        (condition,weight) = feedback(weight,condition,data2,0.5)
        for i in range(10):
            temp=calculation_normal(data2[i][0],data2[i][1],condition,i)
            po[i] = temp
        sim = final_sim(po,weight)
        if(j%10==0):
            #print sim 
            print weight,condition    

def mongo_get_weight():
    conn = MongoClient('localhost',27017)
    mydata = conn['mydata']
    mydata.users = mydata['users']
    u2 = mydata.users.find_one({"_id":101}) # 查不到时返回 None
    #print u2['weight']
    u1 = mydata.users.find_one({"_id":102})
    #print u1['condition']
    return u2['weight'],u1['condition']



def mongo_get_weather():
    conn = MongoClient('localhost',27017)
    mydata = conn['mydata']
    mydata.users = mydata['users']
    u2 = mydata.users.find_one({"_id":103}) # 查不到时返回 None
    #print u2['weather']
    return u2['weather']
 
    


def calcultion_final_sim(weather,weight,condition):
    po=[]
    for i in range(10):
        temp=calculation_normal(weather[i][0],weather[i][1],condition,i)
        po.append(temp)
    sim = final_sim(po,weight)
    return sim
   


def mongo_get_feedback():
    conn = MongoClient('localhost',27017)
    mydata = conn['mydata']
    mydata.users = mydata['users']
    u2 = mydata.users.find_one({"_id":104}) # 查不到时返回 None
    #print u2
    return u2["feedback"],u2["posibility"],u2["temp"]


def main():
    #获取数据 获取参数 
    #权重值
    (weight,condition) = mongo_get_weight()
    #进行反馈计算，权重值，参数值，反馈的日期的数据源，正确率
    
    weather = mongo_get_weather()
    
    sim = calcultion_final_sim(weather,weight,condition)
    print 3,sim
    (feed_data,posibility,temp) = mongo_get_feedback()
    if(temp > 0):
        (condition,weight) = feedback(weight,condition,feed_data,posibility)
        conn = MongoClient('localhost',27017)
        mydata = conn['mydata']
        mydata.users = mydata['users']
        mydata.users.update_one({"_id":101},{'$set':{"weight":weight}})
        mydata.users.update_one({"_id":102},{'$set':{"condition":condition}})


    
    
if __name__ == '__main__':
    main()