from __future__ import print_function
from math import log
import operator
# import treePlotter
import numpy as np
import copy
import csv
import random
import httplib

def InfoEntCalc(Label):
    LabelNum = len(Label)
    #print LabelNum
    labelCount = {}
    ShannonEnt = 0.0
    for currentlabel in Label:
        if currentlabel not in labelCount.keys():
            labelCount[currentlabel] = 0
        labelCount[currentlabel] += 1
    for key in labelCount.keys():
        #print key
        EntPk = labelCount[key] / (LabelNum * 1.0)
        #print EntPk
        ShannonEnt -= EntPk * log(EntPk, 2)
    #print ShannonEnt
    #print labelCount[1]
    return ShannonEnt


def splitDataSet(dataSet,axis,value):
    retDataSet=[]
    for featVec in dataSet:
        if featVec[axis]==value:
            reducedFeatVec=featVec[:axis]
            reducedFeatVec.extend(featVec[axis+1:])
            retDataSet.append(reducedFeatVec)
    return retDataSet


def split_continuous(dataset, idx, value,to):
    # for a continuous feature, we only do binary split by a given target value
    subDataSet=[]
    retDataSet =[]
    for vec in dataset:
        #print(vec[idx])
        if to ==1:
            if vec[idx]>= float(value):
                reducedFeatVec = vec[:idx]
                reducedFeatVec1 = vec[idx + 1:]
                retDataSet= reducedFeatVec + reducedFeatVec1
                #print('retDataSet=',retDataSet)
                subDataSet.append(retDataSet)
                #print('subDataSet2',subDataSet)
        if to ==0:
            if vec[idx] < float(value):
                reducedFeatVec = vec[:idx]
                #print(reducedFeatVec)
                #print(vec[idx+1:])
                reducedFeatVec1=vec[idx + 1:]
                retDataSet = reducedFeatVec + reducedFeatVec1
                #print('retDataSet=', retDataSet)
                subDataSet.append(retDataSet)
                #print('subDataSet', subDataSet)
    return subDataSet


def InfoGainContous(DatSet, Label, k):
    DatSetk = DatSet[:, k]
    nk = len(DatSetk)
    #print DatSetk
    uniqueDatSetk = list(set(DatSetk))
    uniquesortDatSetk = np.sort(uniqueDatSetk)
    n = len(uniquesortDatSetk)
    selectPoint = []
    for index in range(n - 1):
        # print "index:",index
        selectPoint.append((uniquesortDatSetk[index] + uniquesortDatSetk[index + 1]) / 2.0)
        # print 'selectPoint: ',selectPoint
    #print ('selectPoint',selectPoint)
    maxinfoEnt = 0.0
    bestLabel = []
    maxGain = 0
    # print 'Label: ',Label
    # print nk
    bestPoint = -1
    for index in range(n-1):
        Label0 = []
        Label1 = []
        labelCount = 0
        infoEnt = 0.0
        for i in range(nk):
            if DatSetk[i] < selectPoint[index]:
                labelCount += 1
                Label0.append(Label[i])
            else:
                Label1.append(Label[i])
        #print (Label0)
        sumEnt = len(Label0) / (len(Label) * 1.0) * InfoEntCalc(Label0) + len(Label1) / (len(Label) * 1.0) * InfoEntCalc(Label1)
        infoEnt = InfoEntCalc(Label) - sumEnt
        #print('maxinfochu',maxinfoEnt)
        #print('infoent',infoEnt)
        if infoEnt >= maxinfoEnt:
            maxinfoEnt = infoEnt
            bestPoint = selectPoint[index]
            #print('maxinfo',maxinfoEnt)
            bestLabel = Label0
    #print('info',maxinfoEnt)
    #print('point',bestPoint)
    return maxinfoEnt, bestPoint


def MaxGain(DatSet, Label, Table):
    m, n = np.shape(DatSet)
    Gain = 0.0
    maxGain = -1
    bestFeature = -1
    bestPoint = -1
    for tab in Table:
        #print('tab',tab)
        featureNum = list(Table ).index(tab)
        #print ("featureNum: ", featureNum)
        #print (tab)
        Gain, Point = InfoGainContous(DatSet, Label, featureNum)
        if Gain > maxGain:
            bestFeature = featureNum
            maxGain = Gain
            bestPoint = Point
        #print('bestFeature', bestFeature)
        #print ('bestPoint',bestPoint)
    return bestFeature, bestPoint


def majorCnt(Label):
    LabelCnt = {}
    #print (Label)
    for value in Label:
        if value not in LabelCnt.keys():
            LabelCnt[value] = 0
        else:
            LabelCnt[value] += 1
    #print (LabelCnt)
    sortedLabelCnt = sorted(LabelCnt.iteritems(), key=operator.itemgetter(1), reverse=True)
    return sortedLabelCnt[0][0]


def TreeGenerate(Dat, DatOri, Table):
    DatSet = Dat[:,:-1]
    Label = Dat[:, -1]
    #print (Label)
    Tables = Table[:]
    m, n = np.shape(DatSet)
    #print (Dat)
    #print (DatSet)
    if len(Label) == 0:
        return 'NULL'
    if list(Label).count(Label[0]) == m:
        return Label[0]
    if len(Table) == 0:
        return majorCnt(Label)
    if InfoEntCalc(Label) == 0:
        return majorCnt(Label)
    #print (list(Label))
    bestFeature, bestPoint = MaxGain(DatSet, Label, Table)
    bestFeatureTable = Table[bestFeature]
    if bestPoint==-1:
        return majorCnt(Label)
    #print (bestFeatureTable)
    del (Table[bestFeature])
    #print (Table)
    Tree = {bestFeatureTable: {}}
    #print (Tree)
    for value in [-1, 1]:
        if value == -1:
            subDatSetL = Dat[Dat[:, bestFeature] < bestPoint]
            #print ('subDatSetL',subDatSetL)
            subDatSet = np.concatenate((subDatSetL[:, :bestFeature], subDatSetL[:, bestFeature + 1:]), axis=1)
            #print ('subDatSet',subDatSet)
            subDatOri = np.concatenate((DatOri[:, :bestFeature], DatOri[:, bestFeature + 1:]), axis=1)
            #print('subDatOriL',subDatOri)
            subTabel = Table[:]
            #print(subTabel)
            nowLabel = subDatSet[:, -1]
            #print(nowLabel)
            subm, subn = np.shape(subDatSet)
            #print (subm)
            strval = '<' + str(bestPoint)
            #print(strval)
            if (subn == 1):
                Tree[bestFeatureTable][strval] = majorCnt(nowLabel)  # return majorCnt(Label)
            else:
                Tree[bestFeatureTable][strval] = TreeGenerate(subDatSet, subDatOri, subTabel)
        if value == 1:
            subDatSetR = Dat[Dat[:, bestFeature] >= bestPoint]
            subDatSet = np.concatenate((subDatSetR[:, :bestFeature], subDatSetR[:, bestFeature + 1:]), axis=1)
            subDatOri = np.concatenate((DatOri[:, :bestFeature], DatOri[:, bestFeature + 1:]), axis=1)
            #print('subDatSetR', subDatSetR)
            #print('subDatSet', subDatSet)
            nowLabel=subDatSet[:,-1]
            #print('Label',nowLabel)
            #print('subDatOriR', subDatOri)
            subTabel = Table[:]
            subm, subn = np.shape(subDatSet)
            strval = '>=' + str(bestPoint)
            if (subn == 1):
                Tree[bestFeatureTable][strval] = majorCnt(nowLabel)  # return majorCnt(Label)
            else:
                Tree[bestFeatureTable][strval] = TreeGenerate(subDatSet, subDatOri, subTabel)
    return Tree


def classify(inputTree, featLabels, testVec):
    firstStr =inputTree.keys()[0]
    #print(firstStr)
    secondDict = inputTree[firstStr]
    #print('secondDict=',secondDict)
    keys=secondDict.keys()
    #print('keys=',keys)
    threshold = keys[0].strip('>= <')
    #print('threshold=',threshold)
    #print(secondDict['<'+ threshold])
    #print('firstStr',firstStr)
    featIndex = featLabels.index(firstStr)
    #print('featIndex=',featIndex)
    #print('testVec',testVec)
    key=testVec[featIndex]
    if key < float(threshold):
        valueofFeat=secondDict['<' + threshold]
        #print ('valueofFeat=',valueofFeat)
        if isinstance(valueofFeat,dict):
            classLabel=classify(valueofFeat,featLabels,testVec)
        else:
            classLabel=valueofFeat
    else:
        valueofFeat1 = secondDict['>=' + threshold]
        #print('valueofFeat1=',valueofFeat1)
        # print ('valueofFeat=',valueofFeat)
        if isinstance(valueofFeat1, dict):
            classLabel = classify(valueofFeat1, featLabels, testVec)
        else:
            classLabel = valueofFeat1
    #print('classLabel',classLabel)
    return classLabel


def classifyAll(inputTree, featLabels, testDataSet):
    classLabelAll = []
    correct=0.0
    i=-1
    for testVec in testDataSet:
        i+=1
        #print (testVec)
        classLabelAll.append(classify(inputTree, featLabels, testVec))
        #print (testVec[-1])
        #print(classLabelAll[i])
        if testVec[-1]==classLabelAll[i]:
            correct+=1
        else:
            pass
    accuracy=correct/len(testDataSet)
    return classLabelAll,accuracy




def calcTestErr(myTree,testData,labels):
    errorCount = 0.0
    for i in range(len(testData)):
        #print(testData[i])
        if classify(myTree,labels,testData[i]) != testData[i][-1]:
            errorCount += 1
    return float(errorCount)


def testMajor(major,testData):
    errorCount = 0.0
    for i in range(len(testData)):
        if major != testData[i][-1]:
            errorCount += 1
    return float(errorCount)


def Post(inputTree,featureTable):
    firstStr = inputTree.keys()[0]
    firstStr_copy=copy.deepcopy(firstStr)
    #print(firstStr)
    secondDict = inputTree[firstStr]
    #print(secondDict)
    selectfeature = featureTable.index(firstStr)
    keys=secondDict.keys()
    del (featureTable[selectfeature])
    for key in list(secondDict.keys()):
        if type(secondDict[key]).__name__ == 'dict':
            inputTree[firstStr][key] = Post(secondDict[key], copy.deepcopy(featureTable))
        else:
            threshold = keys[0].strip('>= <')
            #print(secondDict['<' + threshold])
            #print(secondDict['>=' + threshold])
            if secondDict['<' + threshold]==secondDict['>=' + threshold]:
                return(secondDict['>=' + threshold])
    return inputTree




def PostPurn(inputTree,featureTable,trainData,testData):
    firstStr = inputTree.keys()[0]
    #print(firstStr)
    secondDict = inputTree[firstStr]
    classList = [example[-1] for example in testData]
    #print(classList)
    featkey = copy.deepcopy(firstStr)
    keys=secondDict.keys()
    subLabels = copy.deepcopy(featureTable)
    #print(subLabels)
    # print "key= ",(firstkey,key)
    value=keys[0].strip('< >=')
    #print(value)
    selectfeature = featureTable.index(firstStr)
    del (featureTable[selectfeature])
    for key in list(secondDict.keys()):
        if type(secondDict[key]).__name__=='dict':
            if '<' in key:
                to=0
            if '>=' in key:
                to=1
            subDataSet =split_continuous(trainData,selectfeature , value,to)
            subTestSet =split_continuous(testData, selectfeature, value,to)
            #print(len(trainData))
            #print('subDataSet=',subDataSet)
            #print('subTestSet',subTestSet)
            if len(subDataSet) > 1 and len(subTestSet) > 1:
                inputTree[firstStr][key] = PostPurn(secondDict[key], copy.deepcopy(featureTable), subDataSet, subTestSet)
    #print('inputTree',inputTree)
    #print('testData',testData)
    #print('subLabel',subLabels)
    #print('errocount=',calcTestErr(inputTree, testData, subLabels),testMajor(majorCnt(classList), testData))
    #print(inputTree)
    if calcTestErr(inputTree, testData, subLabels) < testMajor(majorCnt(classList), testData):
        return inputTree
    return majorCnt(classList)




def storeTree(inputTree, filename):
    import pickle
    fw = open(filename, 'wb')
    pickle.dump(inputTree, fw)
    fw.close()


def grabTree(filename):
    import pickle
    fr = open(filename, 'rb')
    return pickle.load(fr)


def createDataSet():
    dataSet = []
    with open("./data/sys1/xunlian.csv", "rb") as csv_file:
        all_lines = csv.reader(csv_file)
        for one_line in all_lines:
            dataSet.append(one_line)
    for i in range(len(dataSet)):
        for k in range(5):
            dataSet[i][k] = float(dataSet[i][k])
    Table = ['tem', 'hum','rain','days']
    Dat = np.array(dataSet)
    DatSet = Dat[:, :-1]
    Label = Dat[:, -1]
    return Table, DatSet, Label, Dat,dataSet


def createTestDataSet():
    testdata = []
    with open("./data/sys1/shuru.csv", "rb") as csv_file:
        all_lines = csv.reader(csv_file)
        for one_line in all_lines:
            testdata=one_line
    #print (testdata)
    for i in range(len(testdata)):
            testdata[i] = float(testdata[i])
    test_Table = ['tem', 'hum','rain','days']
    return testdata,test_Table



def main():
    Table, DatSet, Label, Dat, dataSet = createDataSet()
    # testdata,test_Table=createTestDataSet()
    test_Table = ['tem', 'hum','rain','days']
    testdata = [23,88,15,1]
    
    #print(Dat)
    labels_tmp = Table[:]
    DatOri = Dat[:]
    desicionTree = TreeGenerate(Dat, DatOri, Table)
    # storeTree(desicionTree, 'classifierStorage.txt')
    # desicionTree = grabTree('classifierStorage.txt')
    #print('desicionTree:\n', desicionTree)
    table_copy1 = copy.deepcopy(test_Table)
    table_copy2 = copy.deepcopy(test_Table)
    table_copy3 = copy.deepcopy(test_Table)
    table_copy4 = copy.deepcopy(test_Table)
    table_copy5 = copy.deepcopy(test_Table)
    table_copy6 = copy.deepcopy(test_Table)
    #print(table_copy1)
    #classifyResult, Accuracy = classifyAll(desicionTree, table_copy1, test_Dat)
    #print('Accuracy:', Accuracy)
    #treePlotter.createPlot(desicionTree)
    #print('classifyResult:',classifyResult)
    myTree1 = Post(desicionTree,table_copy2)
    myTree = Post(myTree1,table_copy3)
    #print(table_copy3)
    #classifyResult1, Accuracy1 = classifyAll(myTree, table_copy4, test_Dat)
    #print('Accuracy1:', Accuracy1)
    #print('mytree',myTree)
    result = str(classify(myTree,test_Table,testdata))
    if result == '1.0':
        result2 = 'a'
    elif result == '2.0':
        result2 = 'b'
    elif result == '3.0':
        result2 = 'c'
    result2 = '3' + result2;
    print(result2)


if __name__ == '__main__':
    main()
