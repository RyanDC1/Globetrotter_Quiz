export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams
    console.log(searchParams)
   
    return Response.json(searchParams.has('test') ? '/assets/home-image.svg' : '/logo.svg')
  }