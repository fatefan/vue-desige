export const ApiUrl = (function () {
    if(__NODE__ENV == 'local') {
        return 'http://localhost:8383';        
    } else if (__NODE__ENV == 'development') {
        return 'http://dev.xxxx.com:8383';
    } else if (__NODE__ENV == 'test') {
        return 'http://test.xxxx.com:8383';
    } else if (__NODE__ENV == 'production') {
        return 'http://www.xxxx.com:8383';
    }
})();

//角色
export const role = [
    {
        name:'组员',
        id:'0'
    },
    {
        name:'组长',
        id:'1'
    }
];
//部门
export const department = [
    {
        name:'市场部门',
        id:'0'
    },
    {
        name:'运维部',
        id:'1'
    }
];
//节点类型
export const nodeType = [
    {
        name: '扩展',
        id:'0'
    },
    {
        name:'大区',
        id:'1'
    },
    {
        name:'省份',
        id:'2'
    },
    {
        name:'城市',
        id:'3'
    },
    {
        name:'市辖区',
        id:'4'
    },
    {
        name:'商圈',
        id:'5'
    },
    {
        name:'商区',
        id:'6'
    },
]
//商区类型
export const regionParentType = [
    {
        name:'校区',
        id:'1'
    },
    {
        name:'写字楼',
        id:'2'
    },
    {
        name:'住宅',
        id:'3'
    },
    {
        name:'商业街',
        id:'4'
    },
    {
        name:'其他',
        id:'5' 
    }
]
