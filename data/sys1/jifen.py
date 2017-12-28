# -*- coding: utf-8 -*-
"""
Created on Tue Dec 12 10:34:59 2017

@author: Administrator
"""

import numpy as np
from scipy.integrate import quad


def main():

    print quad(lambda  x:np.exp(-x),0,np.inf)
    '''求积分，np.inf代表正无穷。
    结果第一个数值代表运算结果，第二个数值代表误差
    '''
    '''
    求二重积分 然后给t,x赋积分区间
    lambda是匿名函数
    '''
    z=11.84096
    #y=((1/(2*3.141592653*z*z))**0.5)*np.exp(-((x-23)**2)/(2*z*z))
    s=quad(lambda x:((1/(2*3.141592653*z*z))**0.5)*np.exp(-((x-23)**2)/(2*z*z)),16,30)
    print s[0]

if __name__ == "__main__":
    main()