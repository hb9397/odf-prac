export const geoserverWfsLayerStyle = {
    YP0001 : {
        image : {
            circle : {
                radius : 4,//크기
                fill : {
                    color : '#FF5A00'
                },
                stroke : {//윤곽선
                    color : '#222222',//테두리 색
                    width : 2,//굵기
                },
                //축척
                scale :1,
                // snapToPixel : true //true : sharp, false : blur
                /*
                //타원 스타일
                //원래 크기의 n배 [가로  축척, 세로 축척]
                scale : [1, 0.2],
                //회전
                rotation : (Math.PI*30/180),
                //지도 회전시 같이 회전할지 여부
                rotateWithView : true,
                */
            }
        },
        text : {
            text : '',//텍스트 내용
            offsetX : 40,//기준점으로부터 텍스트 x좌표 위치 이동
            offsetY : -17,//기준점으로부터 텍스트 Y좌표 위치 이동
            //rotation : (Math.PI*270/180), //회전
            //textAlign : 'left',//텍스트 수평정렬
            //textBaseline : 'middle',//텍스트 수직정렬
            font : '13px Noto Sans KR',//폰트 크기(필수) 및 글씨체(필수), 두께(옵션)
            fill : {
                color : '#111111'
            },
            stroke : {//text 안의 stroke는 lineCap/lineJoin/lineDash/lineDashOffset/miterLimit 옵션 적용  x
                color : [ 255, 255, 255, 0.8 ],
            },
            padding : [ 0.5, 0.5, 0.5, 0.5 ],//text와 background영역 사이의 여백 //placement :'line' 일 경우 미적용
            backgroundStroke : {
                color : 'black'
            },//placement :'line' 일경우 미적용
            backgroundFill : {
                color : 'transparent'
            },//placement :'line' 일경우 미적용
            //maxAngle : 90*Math.PI/180,//placement :'line' 일경우 적용
            //overflow : false,//placement :'line' 일경우 적용//텍스트를 나열한 길이보다 선이 짧을 경우, 넘치는 글자를 쭉 나열할지 여부
            scale : 1, //텍스트 크기를 정해진 값의 n배로 셋팅
            rotateWithView : true
            //지도가 회전할때 텍스트도 적절하게 회전할지 여부
            }
        },
    YP0002 : {
        image : {
            regularShape : {
                fill : {
                    color : '#2C9BCB'
                },
                stroke : {
                    color : '#123964',//테두리 색
                    width : 2,//굵기
                },
                points: 4,
                radius: 5,
                angle: Math.PI / 4,
            }
        },
        text : {
            text : '',//텍스트 내용
            offsetX : 40,//기준점으로부터 텍스트 x좌표 위치 이동
            offsetY : -17,//기준점으로부터 텍스트 Y좌표 위치 이동
            //rotation : (Math.PI*270/180), //회전
            //textAlign : 'left',//텍스트 수평정렬
            //textBaseline : 'middle',//텍스트 수직정렬
            font : '13px Noto Sans KR',//폰트 크기(필수) 및 글씨체(필수), 두께(옵션)
            fill : {
                color : '#111111'
            },
            stroke : {//text 안의 stroke는 lineCap/lineJoin/lineDash/lineDashOffset/miterLimit 옵션 적용  x
                color : [ 255, 255, 255, 0.8 ],
            },
            padding : [ 0.5, 0.5, 0.5, 0.5 ],//text와 background영역 사이의 여백 //placement :'line' 일 경우 미적용
            backgroundStroke : {
                color : 'black'
            },//placement :'line' 일경우 미적용
            backgroundFill : {
                color : 'transparent'
            },//placement :'line' 일경우 미적용
            //maxAngle : 90*Math.PI/180,//placement :'line' 일경우 적용
            //overflow : false,//placement :'line' 일경우 적용//텍스트를 나열한 길이보다 선이 짧을 경우, 넘치는 글자를 쭉 나열할지 여부
            scale : 1, //텍스트 크기를 정해진 값의 n배로 셋팅
            rotateWithView : true
            //지도가 회전할때 텍스트도 적절하게 회전할지 여부
        }
    },
    YP0003 : {
        image: {
            regularShape: {
                fill: {
                    color: '#9013FE'
                },
                stroke: {
                    color: '#222222',//테두리 색
                    width: 2,//굵기
                },
                points: 5,
                radius: 3,
                radius2: 2,
                angle: 0,
            }
        },
        text : {
            text : '',//텍스트 내용
            offsetX : 40,//기준점으로부터 텍스트 x좌표 위치 이동
            offsetY : -17,//기준점으로부터 텍스트 Y좌표 위치 이동
            //rotation : (Math.PI*270/180), //회전
            //textAlign : 'left',//텍스트 수평정렬
            //textBaseline : 'middle',//텍스트 수직정렬
            font : '13px Noto Sans KR',//폰트 크기(필수) 및 글씨체(필수), 두께(옵션)
            fill : {
                color : '#111111'
            },
            stroke : {//text 안의 stroke는 lineCap/lineJoin/lineDash/lineDashOffset/miterLimit 옵션 적용  x
                color : [ 255, 255, 255, 0.8 ],
            },
            padding : [ 0.5, 0.5, 0.5, 0.5 ],//text와 background영역 사이의 여백 //placement :'line' 일 경우 미적용
            backgroundStroke : {
                color : 'black'
            },//placement :'line' 일경우 미적용
            backgroundFill : {
                color : 'transparent'
            },//placement :'line' 일경우 미적용
            //maxAngle : 90*Math.PI/180,//placement :'line' 일경우 적용
            //overflow : false,//placement :'line' 일경우 적용//텍스트를 나열한 길이보다 선이 짧을 경우, 넘치는 글자를 쭉 나열할지 여부
            scale : 1, //텍스트 크기를 정해진 값의 n배로 셋팅
            rotateWithView : true
            //지도가 회전할때 텍스트도 적절하게 회전할지 여부
        }
    },
} as const;