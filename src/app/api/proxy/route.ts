import { NextRequest, NextResponse } from 'next/server';

/*** /api/proxy?url=targetUrl ... ***/
// 외부 API 요청을 Next.js 서버가 대신 중계 (Server to Server)
export const GET = async (req: NextRequest) => {
    try {
        const rawUrl = req.url;
        const urlMatch = rawUrl.match(/url=(.+)/);

        if (!urlMatch || !urlMatch[1]) {
            return NextResponse.json({ error: 'Missing target URL' }, { status: 400 });
        }

        // `url=` 뒤의 값을 그대로 복원 (디코딩까지)
        const encodedTargetUrl = urlMatch[1];
        const decodedTargetUrl = decodeURIComponent(encodedTargetUrl);

        const res = await fetch(decodedTargetUrl);
        const contentType = res.headers.get('content-type') || 'application/octet-stream';
        const buffer = await res.arrayBuffer();

        return new NextResponse(buffer, {
            status: res.status,
            headers: {
                'Content-Type': contentType,
            },
        });
    } catch (e: any) {
        return NextResponse.json({ error: 'Proxy failed', detail: e.message }, { status: 500 });
    }
};