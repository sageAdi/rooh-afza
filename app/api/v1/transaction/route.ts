import {NextRequest, NextResponse} from "next/server";

export async function GET(){
    Response.json({text:'Welcome To Transaction Page'});
}

async function sendTransaction(chain:string, data:unknown, to:string){
    // initiate a rpc provider based on chain
    // set up a gas wallet for deployment
    // send transaction and return transaction hash.
}

export async function POST(req:NextRequest, res:NextResponse){
    const {chain, data, to} = await req.json();
    try{
        Response.json({data: await sendTransaction(chain, data, to), message: 'success'});
    }catch (e) {
        Response.json({error:e, message:'Internal Server Error'});
    }
}
