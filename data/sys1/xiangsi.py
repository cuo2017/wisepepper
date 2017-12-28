# -*- coding: utf-8 -*-
"""
Created on Mon Dec 11 15:58:01 2017

@author: Administrator
"""
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
    x=b + 100 - temp
    u=condition[i][0]
    posiblity_b= (-0.0040697323486256+0.00282941205248453*x+-9.11662495667085*(10**-5)*x**2+8.01724931702652E-7*x**3)/(1+-0.0348754062104871*x+0.000379964168773106*x**2+-1.13319978720871*(10**-6)*x**3)
    if(a>=23):
        left_a=46-a
        integral_temp=quad(lambda x:((1/(2*3.141592653*z*z))**0.5)*np.exp(-((x-u)**2)/(2*z*z)),left_a,a)
        posiblity_a=1-integral_temp[0]
    else:
        right_a=46-a
        integral_temp=quad(lambda x:((1/(2*3.141592653*z*z))**0.5)*np.exp(-((x-u)**2)/(2*z*z)),a,right_a)
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
    for i in range(10):
        temp1 = abs(sim_temp[i] - posibility)
        if( temp1 <= max_min[0][0] ):
            max_min[0][0] = temp1
            max_min[0][1] = i
        if(temp1 >= max_min[1][0]):
            max_min[1][0] = temp1
            max_min[1][1] = i
    weight[max_min[0][1]] = weight[max_min[0][1]] + 0.001
    weight[max_min[1][1]] = weight[max_min[1][1]] - 0.001
    return weight




def correct_condition(sim_temp,condition,posibility,feed_data):
    for i in range(10):
        difference = abs(sim_temp[i] - posibility)
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
    # for j in range(100):
    data2 = [[21.5,85],[22.4,82],[20,84],[25,90],[24.5,86],[26,79],[25.6,82],[23.5,87],[24,90],[24.9,88]]
    po=[]
    for i in range(10):
        temp=calculation_normal(data2[i][0],data2[i][1],condition,i)
        po.append(temp)
    sim = final_sim(po,weight)
    # if(j%10==0):
        # print sim
    (condition,weight) = feedback(weight,condition,data2,0.9)
    for i in range(10):
        temp=calculation_normal(data2[i][0],data2[i][1],condition,i)
        po[i] = temp
    sim = final_sim(po,weight)
    print 3
    print sim
        # if(j%10==0):
            # print sim 
            # print weight,condition    

    
def main():
    #获取数据 获取参数 
    #权重值
    weight = [0.04,0.06,0.08,0.10,0.12,0.13,0.14,0.12,0.11,0.10]
    condition = [[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100],[23,100]]
    #进行反馈计算，权重值，参数值，反馈的日期的数据源，正确率
    

    feed_data=condition
    posibility=1
    (condition,weight) = feedback(weight,condition,feed_data,posibility)


    data1 = open_excel(file='./data/sys1/nanc.xlsx')
    sim = calculation(data1,weight,condition)
    #print sim
    write_excel(data1,sim)
    
    test(weight,condition)
    
    
if __name__ == '__main__':
    main()