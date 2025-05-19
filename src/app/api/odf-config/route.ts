import { NextResponse } from 'next/server';

/*** /api/odf-config GET 요청 Server To Server 로 우회 ***/
// odf-config-wavus.json 에 대한 GET 요청은 NextJS 서버 측에서 받도록 우회
// (그냥 use client tsx 에서 쓰면 클라이언트 측에서 요청한 걸로 간주해 CORS 에 막힘)
export async function GET() {
    const res = await fetch('https://developer.geon.kr/odf-config-wavus.json');
    const data = await res.json();
    return NextResponse.json(data);
}
