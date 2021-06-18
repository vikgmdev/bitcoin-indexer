interface RPCRequest {
  method: string;
  body: string;
}

function generateRPCRequest(
  method: string,
  params = {},
  jsonrpc = '2.0',
  id: number | string = 'rpc-request',
): RPCRequest {
  return {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc,
      id,
      method,
      params,
    }),
  };
}

export default generateRPCRequest;
