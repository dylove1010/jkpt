//左侧标签点击变色
var oldIndex=0
var tablist=document.querySelectorAll(".sidebar a");
for (var i=0;i<tablist.length;i++) {
    tablist[i].index=i;
    tablist[i].onclick=function (){
        tablist[oldIndex].classList.remove("tab-click");
        this.classList.add("tab-click");
        oldIndex=this.index;
    }
}
$(document).ready(function(){
    tablist[0].click();
});

//ztree数据
var setting = {	};
var zNodes =[
    { name:"重庆邮电大学", open:true,
        children: [
            { name:"中心配电房",open:true,
                children: [
                    { name:"2D9",open:true,
                        children:[
                            { name:"中心配电房1600KVA"},
                        ]},
                    { name:"ZD1",
                        children:[
                            { name:"中心配电房1600KVA"},
                        ]},
                    { name:"ZD2",
                        children:[
                            { name:"中心配电房1600KVA"},
                        ]},
                    { name:"ZD3",
                        children:[
                            { name:"中心配电房1600KVA"},
                        ]},
                ]},
            { name:"2号配电房",open:true,
                children: [
                    { name:"叶子节点121"},
                    { name:"叶子节点122"},
                    { name:"叶子节点123"},
                    { name:"叶子节点124"}
                ]},
            { name:"3教配电房", isParent:true},
            { name:"兴业苑配电房",isParent:true},
            { name:"信科楼配电房",open:true,
                children: [
                    { name:"叶子节点211"},
                    { name:"叶子节点212"},
                    { name:"叶子节点213"},
                    { name:"叶子节点214"}
                ]},
            { name:"3栋配电房",
                children: [
                    { name:"叶子节点221"},
                    { name:"叶子节点222"},
                    { name:"叶子节点223"},
                    { name:"叶子节点224"}
                ]},
            { name:"19栋配电房",
                children: [
                    { name:"叶子节点231"},
                    { name:"叶子节点232"},
                    { name:"叶子节点233"},
                    { name:"叶子节点234"}
                ]}
            ,
            { name:"35栋配电房", isParent:true}
        ]},
    { name:"数据2"},
    { name:"数据3"}
];

//动态加载三个标签数据，并改变标签样式.
var treelist=document.querySelectorAll(".center-tab li");
var treeIndex=0;
for (var k=0;k<treelist.length;k++) {
    treelist[k].index=k;
    treelist[k].onclick=function (){
    treelist[treeIndex].classList.remove("center-tab-click");
    this.classList.add("center-tab-click");
    treeIndex=this.index;
    //加载当前点击标签的ztree数据
    $.fn.zTree.init($("#unitTree"), setting, zNodes[this.index]);
    }
}
//默认加载第一个标签的数据
$(document).ready(function(){
    treelist[0].click();
});

//用电分布图
var dom = document.getElementById("chart-con");
var myChart = echarts.init(dom);
var app = {};

var option;

option = {
    title: {
        text: '一天用电量分布',
        subtext: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00','07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00','14:00','15:00','16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00','23:00']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} W'
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: 6,
            color: 'green'
        }, {
            gt: 6,
            lte: 8,
            color: 'red'
        }, {
            gt: 8,
            lte: 14,
            color: 'green'
        }, {
            gt: 14,
            lte: 17,
            color: 'red'
        }, {
            gt: 17,
            color: 'green'
        }]
    },
    series: [
        {
            name: '用电量',
            type: 'line',
            smooth: true,
            data: [150, 140, 130, 130, 125, 135, 140, 180, 195, 215, 235, 225,220, 225, 230, 215, 210, 225, 230, 245, 250, 265, 265, 260],
            markArea: {
                itemStyle: {
                    color: 'rgba(255, 173, 177, 0.4)'
                },
                data: [ [{
                    name: '早高峰',
                    xAxis: '08:00'
                }, {
                    xAxis: '10:00'
                }], [{
                    name: '晚高峰',
                    xAxis: '17:00'
                }, {
                    xAxis: '21:00'
                }] ]
            }
        }
    ]
};

if (option && typeof option === 'object') {
    myChart.setOption(option);
}