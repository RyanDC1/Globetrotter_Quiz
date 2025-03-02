import { ImageResponse } from 'next/og';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {
          searchParams.has('test') ? 'test' : 'hello'
        }
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}