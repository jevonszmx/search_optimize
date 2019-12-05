import os
import pandas as pd
import numpy as np
import fasttext

# 这里可以替换成自己的目录，现在我是把所有文件放到一个目录的
data_path = os.path.dirname(os.path.abspath(__file__)) + '/../model/'

# 读取数据集文件
train = pd.read_csv(data_path+"data.txt", header=0, sep='\r\n', engine='python')
ts =  train.shape
df = pd.DataFrame(train)
new_train = df.reindex(np.random.permutation(df.index))

# 按9:1比例切分为2个文件
indice_90_percent = int((ts[0]/100.0)* 90)

new_train[indice_90_percent:].to_csv(data_path+'test.txt',index=False)
new_train[:indice_90_percent].to_csv(data_path+'train.txt',index=False)

# 开始训练
model = fasttext.train_supervised(input=data_path+"train.txt",
                                    epoch=20,
                                    lr=1.0,
                                    wordNgrams=2,
                                    bucket=200000,
                                    dim=50,
                                    loss='hs')

# 保存训练好的模型
model.save_model(data_path+"model.bin")

# 优化模型
model.quantize(input=data_path+ 'model.bin', retrain=False)
model.save_model(data_path+"model.ftz")

# 测试单个词
print(model.predict("保暖 内衣", k=3))

# 测试集
print(model.test(data_path+"test.txt"))