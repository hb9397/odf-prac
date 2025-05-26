/*
"use client"
import React, {useEffect, useRef} from 'react';
import {useMap} from "@/app/components/MapProvider";

const DrawAndMeasureToolWidget = () => {

    const {baroEMap} = useMap();

    const drawToolRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const odf = (window as any)?.odf;

        /!* 그리기 도구 컨트롤 생성 *!/
        const drawControl = new odf.DrawControl({
            /!*
            연속 측정 여부.
             - true : 연속 측정 기능 활성화. ※ 측정 종료는 clean 함수를 통해서 실행
             - false : (기본값) 연속 측정 기능 비활성화.
             *!/
            continuity : false,

            // 측정 옵션 활성화 여부(선 그리기/원그리기 툴에서 활성화)
            measure : false,

            /!**drawControl 생성 시 새 레이어 생성 여부
             - false : 'odf-layer-draw-unique' 라는 id로 생성. drawControl을 여러개 생성해도 레이어를 공유
             - true :  'odf-layer-draw-xxxx' 라는 id로 생성.
             *!/
            createNewLayer : true,
            // 우클릭 편집 기능(미정의시 사용 안함)
            editFeatureMenu: ['modify', 'dragTranslate', 'delete', 'setText'],
            // 생성할 툴 배열
            // 설정하지 않으면 모든 툴 생성
            tools : [
                'text',//텍스트 그리기 툴
                'polygon',//다각형 그리기 툴
                'lineString',//선 그리기 툴
                'box',//사각형 그리기 툴
                'point',//점 그리기 툴
                'circle',//원 그리기 툴
                'curve',//곡선 그리기 툴
                'buffer',//버퍼 그리기 툴
            ],

            // 툴팁 메세지 변경
            message : {
                DRAWSTART_POINT : '[수정한 메세지]점을 그리기 위해 지도를 클릭해주세요',
                DRAWSTART_LINESTRING : '[수정한 메세지]선을 그리기 위해 지도를 클릭해주세요',
                /!* DRAWSTART_POLYGON: '면을 그리기 위해 지도를 클릭해주세요',
                DRAWSTART_CURVE: '곡선을 그리기 위해 지도를 드래그해주세요',
                DRAWSTART_TEXT: '텍스트를 입력하기 위해 지도를 클릭해주세요.',
                DRAWSTART_BUFFER: '버퍼를 생성하기 위해 레이어를 선택해주세요.',
                DRAWSTART_CIRCLE: '원을 그리기 위해 지도를 클릭해주세요.',
                DRAWSTART_BOX: '사각형을 그리기 위해 지도를 클릭해주세요.',
                DRAWEND_DRAG: '드래그를 멈추면 그리기가 종료됩니다.',
                DRAWEND_DBCLICK: '드래그를 멈추면 그리기가 종료됩니다.', *!/
            },

            // 그리기 도형 스타일
            style : {
                fill : {
                    color : [ 254, 243, 255, 0.6 ]
                },
                stroke : {
                    color : [ 103, 87, 197, 0.7 ],
                    width : 2
                },
                image : {
                    circle : {
                        fill : {
                            color : [ 254, 243, 255, 0.6 ]
                        },
                        stroke : {
                            color : [ 103, 87, 197, 0.7 ],
                            width : 2
                        },
                        radius : 5,
                    },
                },
                text : {
                    textAlign : 'left',
                    font : '30px sans-serif',
                    fill : {
                        color : [ 103, 87, 197, 1 ]
                    },
                    stroke : {
                        color : [ 255, 255, 255, 1 ]
                    },
                },
            },
            bufferStyle : {
                stroke : {
                    color : [ 255, 255, 159, 1 ],
                    width : 2
                },
                fill : {
                    color : [ 255, 255, 159, 0.2 ],
                },
            }
        });

        // 지도 객체와 연결 (컨트롤 ui 생성)
        //drawControl.setMap(baroEMap);

        // 지도 객체와 연결 (컨트롤 ui 생성 x)
        drawControl.setMap(baroEMap,false);

        /!*그리기 시작시 이벤트*!/
        odf.event.addListener(drawControl, 'drawstart', function(feature: any) {
            //feature는 odf.Feature
            console.log("drawstart");
            if (drawToolRef.current) {
                drawToolRef.current.innerText = 'drawstart';
            }
        });

        /!*그리기 종료시 이벤트*!/
        odf.event.addListener(drawControl, 'drawend', function(feature: any) {
            //feature는 odf.Feature
            console.log("drawend");
            if (drawToolRef.current) {
                drawToolRef.current.innerText += 'drawstart';
            }
        });

        //텍스트 그리기
        //drawControl.drawText();
        //폴리곤 그리기
        //drawControl.drawPolygon();
        //라인 그리기
        //drawControl.drawLineString();
        //점 그리기
        //drawControl.drawPoint();
        //곡선 그리기
        //drawControl.drawCurve();
        //사각형 그리기
        //drawControl.drawBox();
        //원 그리기
        //drawControl.drawCircle();
        //버퍼 그리기
        //drawControl.buffer();


        //그리기 레이어 조회
        const drawLayer = drawControl.findDrawVectorLayer();
        //그리기 인터렉션 삭제 및 그리기 오버레이 삭제, 그리던 도형 삭제
        //drawControl.clear()


        /!*그리기 초기화 컨트롤 생성*!/
        const clearControl = new odf.ClearControl();
        clearControl.setMap(baroEMap);
    }, [baroEMap])

    return (
        <>
            <div id="evtChk" ref={drawToolRef}></div>
        </>
    );
};

export default DrawAndMeasureToolWidget;*/
