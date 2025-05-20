import { NextRequest, NextResponse } from 'next/server';

/*** /api/proxy?url=targetUrl ... ***/
// 외부 API 요청을 Next.js 서버가 대신 중계 (Server to Server)
export const GET = async (req: NextRequest) => {
    const targetUrl = req.nextUrl.searchParams.get('url');

    if (!targetUrl) {
        return NextResponse.json({ error: 'Missing target URL' }, { status: 400 });
    }

    try {
        const res = await fetch(targetUrl);
        const contentType = res.headers.get('content-type') || 'application/octet-stream';
        const data = await res.arrayBuffer();

        return new NextResponse(data, {
            status: res.status,
            headers: {
                'Content-Type': contentType,
            },
        });
    } catch (e: any) {
        return NextResponse.json({
            error: 'Proxy request failed',
            detail: e.message,
        }, { status: 500 });
    }
};
