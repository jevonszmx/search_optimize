# 我的电商搜索引擎优化

## 001 类目预测

详细请见[文章](article/搜索引擎.md "搜索引擎")

### 操作步骤


生成模型

```
$ git clone https://github.com/jevonszmx/search_optimize.git
$ tar zxfv model/data.txt.tar.gz
$ cd search_optimize/train
$ pip install -r requirements.txt
$ python train.py

```

得到以下的结果：

```
Read 1M words
Number of words:  86403
Number of labels: 100
Progress: 100.0% words/sec/thread: 1206475 lr:  0.000000 loss:  0.093274 ETA:   0h 0m
(('__label__女士内衣/男士内衣/家居服', '__label__洗护清洁剂/卫生巾/纸/香薰', '__label__乐器/吉他/钢琴/配件'), array([1.00005972e+00, 1.02046288e-05, 1.00188754e-05]))
(9978, 0.8443575866907196, 0.8443575866907196)

```

运行服务

```
$ cd search_optimize/server
$ npm install -S
$ npm run fenci
$ npm run predict

```
