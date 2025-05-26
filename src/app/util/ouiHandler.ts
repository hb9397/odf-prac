/*** oui 배경화면 위젯 생성 ***/
export const createBasemapControlWidget = (map: any, widgetContainer: HTMLLIElement|null) => {
    if (!hasWindowOdfAndOui()) return;

    const odf = (window as any)?.odf;
    const oui = (window as any)?.oui;

    const basemapClient = oui.HttpClient({
        baseURL: 'https://geon-gateway.geon.kr/smt',
    });

    const basemapApi = oui.BasemapApi(basemapClient, {
        crtfckey: 'tmiKPqf1niMu5rq1VcG49XKIYmhwDJEh',
    })

    const options = {
        // 이미지 사용여부
        useImage: true,

        // toolbox 표현 방향
        toolboxPosition: 'left',//'left', 'right'

        //베이스맵 위젯 테마 설정
        //1)'menu' 메뉴 형 2)'gallary' 갤러리형  4)'mobile' 모바일형
        thema: 'gallary',

        // 사용할 배경지도만 필터링
        /*filter: (bcrnMapId/!*배경지도id*!/) => {
            let tailNumber = Number(bcrnMapId.substring(10));
            if (tailNumber >= 2 && tailNumber <= 18) {
                return true;
            }
            return false;
        },*/

        //배경지도의 표출 순서를 변경하는 함수
        /*sort: (list /!*배경지도 정보가 담긴 object의 배열*!/) => {
            return list
        },*/

        //지도 선택 시 그룹 창 닫기 여부
        directClose: false,

        //사용자 정의 alert 사용
        alertList: {
            customAlert: (message: any) => {
                //callAlertMessage(message);
            },
            customErrorAlert: (message: any) => {
                //callAlert('error', message);
            }
        },

        //프록시 정보 셋팅
        proxyObject: {
            proxyURL: "/api/proxy",
            proxyParam: "url"
        },

        //하이브리드 사용여부 기본값 true
        useHybrid : true,
        //빈 지도 사용여부. 기본값 true
        useNoDisplay : false,
        //OSM 사용여부, 기본값 false
        useOSM: false,
        //외부 라이브러리 지도 사용여부 기본값 false
        //활성화 할 경우 옵션에 해당하는 라이브러리를 추가한 후 사용해야 합니다.
        //지도를 활성화하면 mapContainer > 'odf-map' class를 가진 요소의 Position 이 absolute로 변경됩니다.
        mapProviders: {
            useNaverMap: false, //네이버지도 사용여부
            useKakaoMap: false, //카카오맵 사용여부
            useGoogleMap: false, //구글맵 사용여부
        },

        //외부 라이브러리 지도 썸네일 경로
        //해당 경로에 아래와같이 파일이 존재해야 정상적으로 썸네일이 출력됩니다.
        /*
        네이버 - 일반지도: naver.png, 지형도: naverTerrain.png, 위성지도: naverSatellite.png, 하이브리드: naverHybrid.png
        카카오 - 일반지도: kakao.png, 스카이뷰: kakaoSky.png
        구글 - 일반지도: google.png, 지형도: googleTerrain.png, 위성지도: googleSatellite.png, 하이브리드: googleHybrid.png
        */
        thumbnailPath: 'images/widget/basemap', // default
    }

    const basemapControlWidget = new oui.BasemapWidget({
        odf: odf,
        target: widgetContainer,
        api: {
            getBasemapList: basemapApi.getBasemapList
        },
        options
    });

    basemapControlWidget.addTo(map)
}

/*** oui 배경지도 위젯의 테마(모바일, 메뉴, 갤러리형) 변경 ***/
export const setBasemapWidgetThme = (theme: any, map: any, widgetContainer: HTMLLIElement|null) => {
    const options = {
        // 이미지 사용여부
        useImage: true,

        // toolbox 표현 방향
        toolboxPosition: 'left',//'left', 'right'

        //베이스맵 위젯 테마 설정
        //1)'menu' 메뉴 형 2)'gallary' 갤러리형  4)'mobile' 모바일형
        thema: theme,

        // 사용할 배경지도만 필터링
        /*filter: (bcrnMapId/!*배경지도id*!/) => {
            let tailNumber = Number(bcrnMapId.substring(10));
            if (tailNumber >= 2 && tailNumber <= 18) {
                return true;
            }
            return false;
        },*/

        //배경지도의 표출 순서를 변경하는 함수
        /*sort: (list /!*배경지도 정보가 담긴 object의 배열*!/) => {
            return list
        },*/

        //지도 선택 시 그룹 창 닫기 여부
        directClose: false,

        //사용자 정의 alert 사용
        alertList: {
            customAlert: (message) => {
                //callAlertMessage(message);
            },
            customErrorAlert: (message) => {
                //callAlert('error', message);
            }
        },

        //프록시 정보 셋팅
        proxyObject: {
            proxyURL: "/api/proxy",
            proxyParam: "url"
        },

        //하이브리드 사용여부 기본값 true
        useHybrid : true,
        //빈 지도 사용여부. 기본값 true
        useNoDisplay : false,
        //OSM 사용여부, 기본값 false
        useOSM: false,
        //외부 라이브러리 지도 사용여부 기본값 false
        //활성화 할 경우 옵션에 해당하는 라이브러리를 추가한 후 사용해야 합니다.
        //지도를 활성화하면 mapContainer > 'odf-map' class를 가진 요소의 Position 이 absolute로 변경됩니다.
        mapProviders: {
            useNaverMap: false, //네이버지도 사용여부
            useKakaoMap: false, //카카오맵 사용여부
            useGoogleMap: false, //구글맵 사용여부
        },

        //외부 라이브러리 지도 썸네일 경로
        //해당 경로에 아래와같이 파일이 존재해야 정상적으로 썸네일이 출력됩니다.
        /*
        네이버 - 일반지도: naver.png, 지형도: naverTerrain.png, 위성지도: naverSatellite.png, 하이브리드: naverHybrid.png
        카카오 - 일반지도: kakao.png, 스카이뷰: kakaoSky.png
        구글 - 일반지도: google.png, 지형도: googleTerrain.png, 위성지도: googleSatellite.png, 하이브리드: googleHybrid.png
        */
        thumbnailPath: 'images/widget/basemap', // default
    }

    options.thema = theme;

    const odf = (window as any)?.odf;
    const oui = (window as any)?.oui;

    const basemapClient = oui.HttpClient({
        baseURL: 'https://geon-gateway.geon.kr/smt',
    });

    const basemapApi = oui.BasemapApi(basemapClient, {
        crtfckey: 'tmiKPqf1niMu5rq1VcG49XKIYmhwDJEh',
    })

    const basemapControlWidget = new oui.BasemapWidget({
        odf: odf,
        target: widgetContainer,
        api: {
            getBasemapList: basemapApi.getBasemapList
        },
        options
    });

    basemapControlWidget.addTo(map);
}

/*** 그리기 & 측정 도구 생성 ***/
/*export const createDrawAndMeasureWidget = (map: any, drawToolWidgetRef: HTMLLIElement|null, measureToolWidgetRef: HTMLLIElement|null, clearToolWidgetRef: HTMLLIElement|null ) => {

}*/

/*** window.odf, window.oui 접근 가능 유효성 검증 ***/
const hasWindowOdfAndOui = () => {

    let result: boolean = false;

    if (typeof window === "undefined") {
        console.error("window is undefined");
        return result;
    }

    if(typeof (window as any)?.odf === "undefined") {
        console.error("odf is undefined");
        return result;
    }


    if(typeof (window as any)?.oui === "undefined") {
        console.error("odf is undefined");
        return result;
    }

    result = true;

    return result;
}