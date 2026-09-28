import readline from 'node:readline';

const TOOL_NAME = 'word_game_fixture_marker';
const TOOL_MARKER = 'WORD_GAME_MCP_LOADED';
const SERVER_INFO = { name: 'aiae441-word-game-fixture', version: '1.0.0' };

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function respond(id, result) {
  send({ jsonrpc: '2.0', id, result });
}

function fail(id, code, message) {
  send({ jsonrpc: '2.0', id, error: { code, message } });
}

function handle(message) {
  if (message?.jsonrpc !== '2.0' || typeof message.method !== 'string') return;

  const hasId = Object.hasOwn(message, 'id');
  const { id, method, params = {} } = message;

  if (method === 'initialize') {
    respond(id, {
      protocolVersion: params.protocolVersion || '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: SERVER_INFO,
    });
    return;
  }

  if (method === 'ping') {
    if (hasId) respond(id, {});
    return;
  }

  if (method === 'tools/list') {
    respond(id, {
      tools: [{
        name: TOOL_NAME,
        description: 'Return the word guessing game repository fixture marker.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      }],
    });
    return;
  }

  if (method === 'tools/call') {
    if (params.name !== TOOL_NAME) {
      fail(id, -32602, 'Unknown tool');
      return;
    }
    respond(id, { content: [{ type: 'text', text: TOOL_MARKER }], isError: false });
    return;
  }

  if (hasId) fail(id, -32601, 'Method not found');
}

const input = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
input.on('line', (line) => {
  try {
    handle(JSON.parse(line));
  } catch {
    send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
  }
});
