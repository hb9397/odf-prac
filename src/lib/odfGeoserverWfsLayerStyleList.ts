export const geoserverWfsLayerStyle = {
    YP0001 : {
        image : {
            circle : {
                radius : 4,
                fill : {
                    color : '#FF5A00'
                },
                stroke : {
                    color : '#222222',
                    width : 2,
                },
                scale :1,
            }
        },
        text : {
            text : '',
            offsetX : 40,
            offsetY : -17,
            font : '13px Noto Sans KR',
            fill : {
                color : '#111111'
            },
            stroke : {
                color : [ 255, 255, 255, 0.8 ],
            },
            padding : [ 0.5, 0.5, 0.5, 0.5 ],
            backgroundStroke : {
                color : 'black'
            },//placement :'line' 일경우 미적용
            backgroundFill : {
                color : 'transparent'
            },
            scale : 1,
            rotateWithView : true
            }
        },
    YP0002 : {
        image : {
            regularShape : {
                fill : {
                    color : '#2C9BCB'
                },
                stroke : {
                    color : '#123964',
                    width : 2,
                },
                points: 4,
                radius: 5,
                angle: Math.PI / 4,
            }
        },
        text : {
            text : '',
            offsetX : 40,
            offsetY : -17,
            font : '13px Noto Sans KR',
            fill : {
                color : '#111111'
            },
            stroke : {
                color : [ 255, 255, 255, 0.8 ],
            },
            padding : [ 0.5, 0.5, 0.5, 0.5 ],
            backgroundStroke : {
                color : 'black'
            },
            backgroundFill : {
                color : 'transparent'
            },
            scale : 1,
            rotateWithView : true

        }
    },
    YP0003 : {
        image: {
            regularShape: {
                fill: {
                    color: '#9013FE'
                },
                stroke: {
                    color: '#222222',
                    width: 2,
                },
                points: 5,
                radius: 3,
                radius2: 2,
                angle: 0,
            }
        },
        text : {
            text : '',
            offsetX : 40,
            offsetY : -17,
            font : '13px Noto Sans KR',
            fill : {
                color : '#111111'
            },
            stroke : {
                color : [ 255, 255, 255, 0.8 ],
            },
            padding : [ 0.5, 0.5, 0.5, 0.5 ],
            backgroundStroke : {
                color : 'black'
            },
            backgroundFill : {
                color : 'transparent'
            },
            scale : 1,
            rotateWithView : true
        }
    },
} as const;